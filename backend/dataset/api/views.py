# Create your views here.
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

import os
import nrrd
from pydicom import dcmread
from pydicom.filebase import DicomBytesIO
import numpy as np
from scipy.ndimage import zoom
from ..utils import upload_volume

from ..models import Dataset, Membership
from ..serializers import DatasetSerializer


class DatasetViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = DatasetSerializer

    def get_queryset(self):
        return Dataset.objects.filter()
        return Dataset.objects.filter(membership__user=self.request.user)

    def list(self, request, *args, **kwargs):
        datasets = Dataset.objects.filter(membership__user=request.user)
        return Response(
            {
                "data": DatasetSerializer(
                    datasets,
                    many=True,
                    context={'request': request}).data
            },
            status=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        files = request.FILES.getlist('file')
        num_files = len(files)

        # Read first file to get metadata
        first = dcmread(DicomBytesIO(files[0].read()))

        patient_name = first.PatientName
        phase = 'undefined'
        try:
            phase = first.ImageComments
        except:
            pass

        # Distance in space, order: z x y
        voxel_spacing = [float(first.SliceThickness), *first.PixelSpacing]

        # Init the volume for later assignment, this operation is super cheaper compare to iteratively concatenate on the go
        volume = np.zeros((num_files, *first.pixel_array.shape))

        # This auxilary volume will be use to store the initially unordered layers, this is necessary since the order of the files is trash
        # If you mind about this, ask me for verbose description
        aux_volume = np.zeros((num_files, *first.pixel_array.shape))

        # This store the index of the layers in the auxilary volume and the location of them in physical space
        # So if idx_and_location[i] = j, then the layer store at aux_volume[j] actually is the i^th layer in volume, i.e. volume[i] = aux_volume[j]
        # The order of idx_and_location will be sorted by the location of them in physical space
        idx_and_location = [(0, 0.0) for i in range(num_files)]

        for i in range(1, num_files):
            info = dcmread(DicomBytesIO(files[i].read()))

            # Initially, index i will be store in idx_and_location[i], we will sort it later on
            slice_location = i
            try:
                slice_location = float(info.SliceLocation)
            except:
                pass
            idx_and_location[i] = (i, slice_location)

            # The try catch is necessary since there are files which are broken and cannot be read
            try:
                aux_volume[i] = info.pixel_array
            except:
                # If a layer is faulty, assign its value to be its preceding layer's
                # This is risky, fix later
                aux_volume[i] = aux_volume[i - 1]

        # This is the sorting we were talking about
        idx_and_location = sorted(
            idx_and_location, key=lambda x: x[1], reverse=True)

        # Relocate the layers in right order
        for i in range(len(idx_and_location)):
            volume[i] = aux_volume[idx_and_location[i][0]]

        # Normalize the spacing between voxels to be 1x1x1 mm^3 for volume_true and 0.5x0.5x0.5 for volume_for_view
        volume_true = zoom(volume, [i/1.0 for i in voxel_spacing])

        # Create dataset
        dataset = Dataset.objects.create(
            patient_name=patient_name,
            phase=phase,
        )

        Membership.objects.create(
            dataset=dataset,
            role='owner',
            user=request.user
        )

        if not os.path.exists(f'nrrd/{id}'):
            os.makedirs(f'nrrd/{id}')
        nrrd.write(f'nrrd/{id}/volume_true.nrrd', volume_true)

        return Response(
            {
                "data": DatasetSerializer(dataset, context={'request': request}).data
            },
            status=status.HTTP_200_OK
        )
