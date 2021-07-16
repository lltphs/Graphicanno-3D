import displayImageFromVirtualSliceCanvas from "../../Cornerstone/displayImageFromVirtualSliceCanvas";
import { Vector3D } from "../VectorSystem/Vector3D";
import VirtualSlice from "../VirtualSlice";
import * as cornerstoneTools from 'cornerstone-tools';

export const removeSliceOnVolume = (slice, matNVol) => {
  drawOrRemoveSliceOnVolume(slice, matNVol, false);
}

export const drawSliceOnVolume = (slice, matNVol) => {
  drawOrRemoveSliceOnVolume(slice, matNVol, true);
}

export const drawSliceOnCornerstoneElement = (slice, matNVol, cornerstoneElementRef) => {
  drawSliceOnVirtualSliceCanvas(slice, matNVol);
  displayImageFromVirtualSliceCanvas(slice, matNVol, cornerstoneElementRef);
}

export const removeOldAnnotation = (cornerstoneElementRef) => {
  const {
    getters
  } = cornerstoneTools.getModule('segmentation');

  const labelmap2D = getters.labelmap2D(cornerstoneElementRef.current);

  const arrayPixel = labelmap2D.labelmap2D.pixelData;

  for (let i = 0; i < arrayPixel.length; i++) {
    arrayPixel[i] = 0;
  }
}

export const notifyVolume3DUpdate = (matNVol) => {
  matNVol.mat.uniforms['u_data'].value.needsUpdate = true;
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
        //Mark the corresponding point on volume as slice.sliceInnerBrightness if isDraw, else mark it as its original value
        const flatIndex3D = vec3D.x + vec3D.y * matNVol.vol.xLength + vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;

        if (matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] != 1){
          if (isDraw) {
            matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = slice.sliceInnerBrightness;
          } else {
          matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = matNVol.vol.data[flatIndex3D];
          }
        }

      } else if (checkPointLiesOnVolumeSurface(vec3D, matNVol.vol)) {
        //Mark the corresponding point on volume as slice.sliceBoundBrightness if isDraw, else mark it as its original value
        const flatIndex3D = vec3D.x + vec3D.y * matNVol.vol.xLength + vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;
             
        if (matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] != 1){
          if (isDraw) {
            matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = slice.sliceBoundBrightness;
          } else {
          matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = matNVol.vol.data[flatIndex3D];
          }
        }
      }
    }
  }
}

export const drawSliceOnVirtualSliceCanvas  = (slice: VirtualSlice, matNVol) => {
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

        const flatIndex2D = vec2D.x +
                            vec2D.y * slice.sideLength;

        const pixelValue = 255 * matNVol.vol.data[flatIndex3D];

        imageArrayData[0 + 4 * flatIndex2D] = pixelValue;
        imageArrayData[1 + 4 * flatIndex2D] = pixelValue;
        imageArrayData[2 + 4 * flatIndex2D] = pixelValue;
      }
    }
  }

  const imageData = new ImageData(imageArrayData, slice.sideLength, slice.sideLength)

  const canvas = document.getElementById('vs') as HTMLCanvasElement;

  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = slice.sideLength;
  canvas.height = slice.sideLength;
  
  ctx.putImageData(imageData, 0, 0);
}

const checkPointIsCoveredByVolume = (vec: Vector3D, vol) => {
  return vec.x > 3 && vec.x < vol.xLength - 3
      && vec.y > 3 && vec.y < vol.yLength - 3
      && vec.z > 3 && vec.z < vol.zLength - 3;
}

const checkPointLiesOnVolumeSurface = (vec: Vector3D, vol) => {
  return vec.x >= 0 && vec.x <= vol.xLength - 1
      && vec.y >= 0 && vec.y <= vol.yLength - 1
      && vec.z >= 0 && vec.z <= vol.zLength - 1
      && !checkPointIsCoveredByVolume(vec, vol);
}