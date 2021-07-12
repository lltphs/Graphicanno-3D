import nrrd
import numpy as np

cache = dict()

def get_volume(user_name,patient_name,phase):
    if f'nrrd/{user_name}/{patient_name}/{phase}/volume_true.nrrd' in cache:
        volume = cache[f'nrrd/{user_name}/{patient_name}/{phase}/volume_true.nrrd']
    else:
        volume, _ = nrrd.read(f'nrrd/{user_name}/{patient_name}/{phase}/volume_true.nrrd')
        cache[f'nrrd/{user_name}/{patient_name}/{phase}/volume_true.nrrd'] = volume
    return volume

def create_sub_virtual_slice(sub_virtual_slice_info):
    O,u, v, volume, side_length, num_sub_virtual_slice, this_sub_idx = sub_virtual_slice_info
    x_length = side_length // num_sub_virtual_slice if this_sub_idx < num_sub_virtual_slice - 1 else side_length % num_sub_virtual_slice
    y_length = side_length
    x_offset = this_sub_idx * side_length // num_sub_virtual_slice
    sub_virtual_slice = np.zeros((x_length, y_length))
    for x in range(-x_length // 2, x_length // 2):
        for y in range(-y_length // 2, y_length // 2):
            pos = (O + (x_offset + x) * u + y * v).astype('int')
            if np.all(pos > 0) and np.all(pos < volume.shape):
                pos_x, pos_y, pos_z = pos
                sub_virtual_slice[x+x_length // 2,y+side_length // 2] = volume[pos_x, pos_y, pos_z]
    return sub_virtual_slice