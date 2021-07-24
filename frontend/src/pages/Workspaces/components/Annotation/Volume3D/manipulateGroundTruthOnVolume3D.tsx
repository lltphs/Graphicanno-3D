export const checkPointIsForeground = (matNVol, position) => {
  return matNVol.annotation.uniforms['u_data'].value.image.data[position] == 0.5;
}

export const annotatePointAsForeground = (matNVol, position) => {
  matNVol.annotation.uniforms['u_data'].value.image.data[position] = 0.5;
}

export const annotatePointAsBackground = (matNVol, position) => {
  if (checkPointIsForeground(matNVol, position)) {
    matNVol.annotation.uniforms['u_data'].value.image.data[position] = 0;
  }
}