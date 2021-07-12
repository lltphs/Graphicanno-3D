import Volume3D from "../../Volume3D/Volume3D";
import { Vector3D } from "../VectorSystem/Vector3D";
import VirtualSlice from "../VirtualSlice";

export const removeSliceOnVolume = (slice, matNVol) => {
  drawOrRemoveSliceOnVolume(slice, matNVol, false);
}

export const drawSliceOnVolume = (slice, matNVol) => {
  drawOrRemoveSliceOnVolume(slice, matNVol, true);
}


export const updateSliceState = (slice: VirtualSlice, event) => {
  if (event.key) {
    if (event.key === 'ArrowUp' || event.key == 'w') slice.moveForward();
    if (event.key == 'ArrowDown' || event.key == 's') slice.movebackward();
    if (event.key == 'ArrowLeft' || event.key == 'a') slice.rotateLeft();
    if (event.key == 'ArrowRight' || event.key == 'd') slice.rotateRight();
  } else if (event.deltaY) {
    if (event.deltaY > 0) slice.rotateUp();
    if (event.deltaY < 0) slice.rotateDown();
  }
}

const drawOrRemoveSliceOnVolume  = (slice: VirtualSlice, matNVol, isDraw) => {
  //Origin locates in the center of slice, so both ends of 2 side are half-length away from the origin
  let halfSideLength = Math.floor(slice.sideLength / 2);

  //Start and arrive at each end of each side
  for (let i = -halfSideLength; i < halfSideLength; i++){
    for (let j = -halfSideLength; j < halfSideLength; j++){
      //vec3D = O3D + i * u3D + j * v3D
      let vec3D = slice.O3D.add(slice.u3D.scalarMul(i)).add(slice.v3D.scalarMul(j)).round();

      if (checkPointIsCoveredByVolume(vec3D, matNVol.vol)) {
        //Mark the corresponding point on volume as 0.6 if isDraw, else mark it as its original value
        const flatIndex3D = vec3D.x + vec3D.y * matNVol.vol.xLength + vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;

        matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = isDraw ? 0.6 : matNVol.vol.data[flatIndex3D];
      } else if (checkPointLiesOnVolumeSurface(vec3D, matNVol.vol)) {
        //Mark the corresponding point on volume as 1 if isDraw, else mark it as its original value
        const flatIndex3D = vec3D.x + vec3D.y * matNVol.vol.xLength + vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;
        
        matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = isDraw ? 1 : matNVol.vol.data[flatIndex3D];
      }
    }
  }
}

export const drawSliceOnCanvas  = (slice: VirtualSlice, matNVol) => {
  const imageArrayData = new Uint8ClampedArray(
    slice.sideLength * slice.sideLength * 4
  ).map((x, i) => (i % 4 === 3 ? 255 : 0));
  
  //Origin locates in the center of slice, so both ends of 2 side are half-length away from the origin
  let halfSideLength = Math.floor(slice.sideLength / 2);

  //Start and arrive at each end of each side
  for (let i = -halfSideLength; i < halfSideLength; i++){
    for (let j = -halfSideLength; j < halfSideLength; j++){
      //vec3D = O3D + i * u3D + j * v3D
      let vec3D = slice.O3D.add(slice.u3D.scalarMul(i)).add(slice.v3D.scalarMul(j)).round();

      //vec2D = O2D + i * u2D + j * v2D
      let vec2D = slice.O2D.add(slice.u2D.scalarMul(i)).add(slice.v2D.scalarMul(j)).round();

      if (checkPointIsCoveredByVolume(vec3D, matNVol.vol) || checkPointLiesOnVolumeSurface(vec3D, matNVol.vol)) {
        const flatIndex3D = vec3D.x +
                            vec3D.y * matNVol.vol.xLength +
                            vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;

        const flatIndex2D = 4 * vec2D.x +
                            4 * vec2D.y * slice.sideLength;

        const pixelValue = 255 * matNVol.vol.data[flatIndex3D];

        imageArrayData[0 + flatIndex2D] = pixelValue;
        imageArrayData[1 + flatIndex2D] = pixelValue;
        imageArrayData[2 + flatIndex2D] = pixelValue;
      }
    }
  }

  const imageData = new ImageData(imageArrayData, slice.sideLength, slice.sideLength)

  const canvas = document.getElementById('vs') as HTMLCanvasElement;

  let ctx;
  try {
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  } catch (error) {
    console.log('here', error);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = slice.sideLength;
  canvas.height = slice.sideLength;
  
  ctx.putImageData(imageData, 0, 0);
}

const checkPointIsCoveredByVolume = (vec: Vector3D, vol) => {
  return vec.x >= 0 && vec.x < vol.xLength
      && vec.y >= 0 && vec.y < vol.yLength
      && vec.z >= 0 && vec.z < vol.zLength;
}

const checkPointLiesOnVolumeSurface = (vec: Vector3D, vol) => {
  return vec.x >= 0 && vec.x < vol.xLength
      && vec.y >= 0 && vec.y < vol.yLength
      && vec.z >= 0 && vec.z < vol.zLength;
}