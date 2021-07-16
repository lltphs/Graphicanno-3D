import { notifyVolume3DUpdate } from "../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";

const applyAnnotationOnVolumeFromExternalSource = (matNVol, annotation) => {
  for (let i = 0; i < annotation.length; i++) {
    if (annotation[i] > 0) {
      matNVol.mat.uniforms['u_data'].value.image.data[i] = annotation[i];
    } else {
      matNVol.mat.uniforms['u_data'].value.image.data[i] = matNVol.vol.data[i];
    }
  }
  notifyVolume3DUpdate(matNVol);
}

export default applyAnnotationOnVolumeFromExternalSource;