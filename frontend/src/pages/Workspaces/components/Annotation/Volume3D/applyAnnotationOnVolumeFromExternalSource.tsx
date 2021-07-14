const applyAnnotationOnVolumeFromExternalSource = (matNVol, annotation) => {
  for (let i = 0; i < annotation.length; i++) {
    if (annotation[i] > 0) {
      matNVol.mat.uniforms['u_data'].value.image.data[i] = annotation[i];
    }
  }
  matNVol.mat.uniforms['u_data'].value.needsUpdate = true;
}

export default applyAnnotationOnVolumeFromExternalSource;