from DATv3.constants import NUM_CPU
from DATv3.utils import create_sub_virtual_slice, get_volume, cache
from numpy.lib.function_base import append, insert
from io import BytesIO
from django.conf import settings
from django.http import HttpResponse
from django.http import HttpResponseForbidden
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.http.response import FileResponse, JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import AccessToken

from utils.simple_jwt import authenticate_from_request, authenticate_from_raw_token

import nrrd
from pydicom import dcmread
from pydicom.filebase import DicomBytesIO
import numpy as np
from scipy.ndimage import zoom
import base64
import os
import cv2
from multiprocessing import Pool
from math import sqrt

User = get_user_model()

def remove_last_slash(path):
    new_path = path
    while new_path[len(new_path) - 1] == '/':
        new_path = path[:-1]
    return new_path

def media_access(request, path):
    r"""
    When trying to access :
    myproject.com/media/uploads/passport.png

    If access is authorized, the request will be redirected to
    myproject.com/protected/media/uploads/passport.png

    This special URL will be handle by nginx we the help of X-Accel
    """
    access_granted = False

    user = request.user

    token = request.GET.get('token')
    if user.is_anonymous and token and token != '':
        try:
            user = authenticate_from_raw_token(token)[0]
        except:
            pass

    if user.is_anonymous and request.headers:
        try:
            user = authenticate_from_request(request)[0]
        except:
            pass

    if user.is_authenticated:
        if user.is_staff:
            # If admin, everything is granted
            access_granted = True
        elif user.is_active:
            # For simple user, only their documents can be accessed
            # TODO: Chi nhung user duoc accept moi truy cap duoc anh trong dataset va workspace do
            access_granted = True

    if access_granted:
        response = HttpResponse()
        response['X-Accel-Redirect'] = settings.PROTECTED_MEDIA_URL + remove_last_slash(path)
        response['Content-Disposition'] = 'attachment; filename="{}"'.format(remove_last_slash(path).split('/')[-1])
        return response
    else:
        return HttpResponseForbidden('Not authorized to access this media.')


def upload_dicom(request, user_name):
    files = request.FILES.getlist('file')
    num_files = len(files)

    #Read first file to get metadata
    first = dcmread(DicomBytesIO(files[0].read()))
    
    patient_name = first.PatientName
    phase = 'undefined'
    try: phase = first.ImageComments
    except: pass

    #Distance in space, order: z x y
    voxel_spacing = [float(first.SliceThickness), *first.PixelSpacing]

    #Init the volume for later assignment, this operation is super cheaper compare to iteratively concatenate on the go
    volume = np.zeros((num_files, *first.pixel_array.shape))

    #This auxilary volume will be use to store the initially unordered layers, this is necessary since the order of the files is trash
    #If you mind about this, ask me for verbose description
    aux_volume = np.zeros((num_files, *first.pixel_array.shape))

    #This store the index of the layers in the auxilary volume and the location of them in physical space
    #So if idx_and_location[i] = j, then the layer store at aux_volume[j] actually is the i^th layer in volume, i.e. volume[i] = aux_volume[j]
    #The order of idx_and_location will be sorted by the location of them in physical space
    idx_and_location = [(0,0.0) for i in range(num_files)]

    for i in range(1,num_files):
        info = dcmread(DicomBytesIO(files[i].read()))

        #Initially, index i will be store in idx_and_location[i], we will sort it later on
        slice_location = i
        try: slice_location = float(info.SliceLocation)
        except: pass
        idx_and_location[i] = (i,slice_location)

        #The try catch is necessary since there are files which are broken and cannot be read
        try:
            aux_volume[i] = info.pixel_array
        except:
            #If a layer is faulty, assign its value to be its preceding layer's
            #This is risky, fix later
            aux_volume[i] = aux_volume[i - 1]
    
    #This is the sorting we were talking about
    idx_and_location = sorted(idx_and_location, key = lambda x: x[1], reverse=True)

    #Relocate the layers in right order
    for i in range(len(idx_and_location)):
        volume[i] = aux_volume[idx_and_location[i][0]]

    # Uncomment these lines to observe the 2D slices
    # volume = ((volume - volume.min())/(volume.max() - volume.min())).astype('float32')
    # for i in range(num_files):
    #     cv2.imshow('test', volume[i])
        
    #     #Press q to quit
    #     if cv2.waitKey() == ord('q'):
    #         break

    # temp = zoom(volume, [i/1.0 for i in voxel_spacing])
    # print(temp.max())
    # print(temp.min())
    # temp[temp < -1000] = -1000
    # temp[temp > 400] = 400
    # temp = temp.astype('float32')
    # temp = (temp - temp.min())/(temp.max() - temp.min())
    # np.save('sample', temp)

    # Normalize the spacing between voxels to be 1x1x1 mm^3 for volume_true and 0.5x0.5x0.5 for volume_for_view
    volume_true = zoom(volume, [i/1.0 for i in voxel_spacing])
    volume_for_view = zoom(volume, [i/2.0 for i in voxel_spacing])

    volume_true = volume_true.astype('float32')
    volume_for_view = volume_for_view.astype('float32')

    # Normalize value from uint8 0 -> 255 to float32 0.0 -> 1.0 for volume_true and 0.0 -> 0.85 for volume_for_view
    # This step is crucial since the zoom function might create abnomal values (such as very small negative numbers like -1.0e-8)
    volume_true = (volume_true - volume_true.min())/(volume_true.max() - volume_true.min())
    volume_for_view = 0.85 * (volume_for_view - volume_for_view.min())/(volume_for_view.max() - volume_for_view.min())
    volume_for_view_test = 0.85 * (volume_true - volume_true.min())/(volume_for_view.max() - volume_for_view.min())
    
    #Write two files, make dirs if needed
    if not os.path.exists(f'nrrd/{user_name}/{patient_name}/{phase}'): os.makedirs(f'nrrd/{user_name}/{patient_name}/{phase}')
    nrrd.write(f'nrrd/{user_name}/{patient_name}/{phase}/volume_true.nrrd', volume_true)
    nrrd.write(f'nrrd/{user_name}/{patient_name}/{phase}/volume_for_view.nrrd', volume_for_view)
    nrrd.write(f'nrrd/{user_name}/{patient_name}/{phase}/volume_for_view_test.nrrd', volume_for_view_test)

    #Cache two volumes, after making sure cache does not grow too large
    if len(cache) > 10:
        cache.pop()
        cache.pop()
    cache[f'nrrd/{user_name}/{patient_name}/{phase}/volume_true.nrrd'] = volume_true
    cache[f'nrrd/{user_name}/{patient_name}/{phase}/volume_for_view.nrrd'] = volume_for_view
    print('done')
    return HttpResponse('OK')

def get_list_volume(request, user_name):
    """
    Return a list of dictionary in which there are two fields:
        patient-name: Name of a patient
        phases: List of phases when the patient took the CT scans
    
    Example:
        [
            {
                'patient-name': 'Nguyen Cong Thanh',
                'phases': ['Dep trai', 'Ngau', 'Lanh lung']
            },
            {
                'patient-name': 'Nguyen Cong Thanh 2',
                'phases': ['Kha dep trai', 'Kha ngau', 'Kha lanh lung']
            },
        ]
    """
    volume_category = []

    for currentdir_subdirs_file in list(os.walk(f'nrrd/{user_name}')):
        currentdir, subdirs, file = currentdir_subdirs_file
        if currentdir.endswith(user_name): #Then subdirs is the patient names we need, go explore, then break
            for patient_name in subdirs:
                for inner_currentdir_subdirs_file in list(os.walk(f'nrrd/{user_name}/{patient_name}')):
                    inner_currentdir, inner_subdirs, inner_file = inner_currentdir_subdirs_file
                    if inner_currentdir.endswith(patient_name): #Then inner_subdirs is the phase we need, write to category, then break
                        volume_category.append({'patient-name': patient_name, 'phases': inner_subdirs})
                        break
            break
    return JsonResponse(volume_category, safe=False)

def get_nrrd(request,user_name,patient_name,phase):
    return HttpResponse(open(f'nrrd/{user_name}/{patient_name}/{phase}/volume_for_view_test.nrrd', 'rb'))

def get_png_slice(request,user_name,patient_name,phase,index):
    volume = get_volume(user_name,patient_name,phase)
    slice = volume[index]
    _, png = cv2.imencode(".png", (slice * 255).astype('uint8'))
    png_buffer = BytesIO(png)
    return FileResponse(png_buffer)

def get_textures(request, filename):
    return HttpResponse(open(f'textures/{filename}', 'rb'))

def get_annotation(request,user_name,patient_name,phase,index):
    #Only prototype
    if f'sample_annotation.npy' in cache or False:
        full_annotation = cache[f'sample_annotation.npy']
    else:
        full_annotation = np.load(f'sample_annotation.npy')
        cache[f'sample_annotation.npy'] = full_annotation
    slice_annotation = full_annotation[index]
    slice_annotation_as_xy = []
    print(full_annotation[0,0,0])
    for x in range(slice_annotation.shape[0]):
        for y in range(slice_annotation.shape[1]):
            if slice_annotation[x,y] > 0:
                slice_annotation_as_xy.append([x,y])
    return JsonResponse(slice_annotation_as_xy, safe=False)

def get_png_virtual_slice(request,user_name,patient_name,phase,Ox,Oy,Oz,ux,uy,uz,vx,vy,vz):
    volume = get_volume(user_name,patient_name,phase)
    
    side_length = int(sqrt(sum(map(lambda shape: shape*shape, volume.shape))))
    O = np.array([Ox,Oy,Oz]).astype('float')
    u = np.array([ux,uy,uz]).astype('float')
    v = np.array([vx,vy,vz]).astype('float')
    num_sub_virtual_slice = 2
    sub_virtual_slices = Pool().map(create_sub_virtual_slice, [(O,u,v,volume,side_length,num_sub_virtual_slice,idx) for idx in range(num_sub_virtual_slice)])
    virtual_slice = np.zeros((side_length, side_length))
    for i in range(num_sub_virtual_slice):
        x_offset = i * side_length // num_sub_virtual_slice
        x_length = side_length // num_sub_virtual_slice if i < num_sub_virtual_slice - 1 else side_length % num_sub_virtual_slice
        virtual_slice[x_offset:x_offset+x_length] = sub_virtual_slices[i]
    
    _, png = cv2.imencode(".png", (virtual_slice * 255).astype('uint8'))
    return FileResponse(BytesIO(png)) 