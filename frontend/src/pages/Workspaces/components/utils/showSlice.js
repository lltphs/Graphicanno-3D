import slice from './virtualSlice'

const showSlice = ({ volume, material }) => {
  //Turn on Slice
  const volconfig = { show_slice: 1 }
  if (volconfig.show_slice === 1) {
    slice.addVolume(volume)

    for (let i = -slice.imSize; i < slice.imSize; i++){
      for (let j = -slice.imSize; j < slice.imSize; j++){
        let new_vector = slice.u.scalarMultiple(i / 2).add(slice.v.scalarMultiple(j / 2)).add(slice.origin);
        let x = Math.round(new_vector.x);
        let y = Math.round(new_vector.y);
        let z = Math.round(new_vector.z);
        if (x >= 0 && x < volume.xLength && y >= 0 && y < volume.yLength && z >= 0 && z < volume.zLength) {
          material.uniforms['u_data'].value.image.data[
            x + y * volume.xLength + z * volume.xLength * volume.yLength
          ] = 0.6;
        }
      }
    }
  }
  //Turn off slice
  else {
    for (let i = -slice.imSize; i < slice.imSize; i++){
      for (let j = -slice.imSize; j < slice.imSize; j++){
        let new_vector = slice.u.scalarMultiple(i / 2).add(slice.v.scalarMultiple(j / 2)).add(slice.origin);
        let x = Math.round(new_vector.x);
        let y = Math.round(new_vector.y);
        let z = Math.round(new_vector.z);
        if (x >= 0 && x < volume.xLength && y >= 0 && y < volume.yLength && z >= 0 && z < volume.zLength) {
          material.uniforms['u_data'].value.image.data[
            x + y * volume.xLength + z * volume.xLength * volume.yLength
          ] = volume.data[
            x + y * volume.xLength + z * volume.xLength * volume.yLength
          ];
        }
      }
    }
  }
  material.uniforms['u_data'].value.needsUpdate = true
}

export default showSlice
