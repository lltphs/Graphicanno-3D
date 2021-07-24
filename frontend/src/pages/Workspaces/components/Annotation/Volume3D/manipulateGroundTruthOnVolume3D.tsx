export const checkPointIsForeground = (matNVol, position) => {
  return matNVol.annotation.uniforms['u_data'].value.image.data[position] == 1;
}

export const annotatePointAsForeground = (matNVol, position) => {
  matNVol.annotation.uniforms['u_data'].value.image.data[position] = 1;
}

export const annotatePointAsBackground = (matNVol, position) => {
  matNVol.annotation.uniforms['u_data'].value.image.data[position] = 0;
  // let z = Math.floor(position / (matNVol.vol.xLength * matNVol.vol.yLength));
  // for (let i = 0; i < matNVol.vol.zLength; i++) {
  //   matNVol.mat.uniforms['u_data'].value.image.data[position + (i - z) * matNVol.vol.xLength * matNVol.vol.yLength] = 0;
  //   matNVol.vol.data[position + (i - z) * matNVol.vol.xLength * matNVol.vol.yLength] = 0;
  // }
}