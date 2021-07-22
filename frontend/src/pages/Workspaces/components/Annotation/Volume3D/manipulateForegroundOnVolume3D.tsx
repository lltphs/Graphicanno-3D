export const checkPointIsForeground = (matNVol, position) => {
  return matNVol.mat.uniforms['u_data'].value.image.data[position] >= 0.5;
}

export const annotatePointAsForeground = (matNVol, position, minValue = 0, maxValue = 1) => {
  matNVol.mat.uniforms['u_data'].value.image.data[position] = 0.5 + 0.5 * (matNVol.vol.data[position] - minValue) / (maxValue - minValue);
}