import displayImageOnCornerstoneElementFromVirtualSliceCanvas, { applyAnnotationOnCornerstoneElement } from "../../Cornerstone/displayImageOnCornerstoneElementFromVirtualSliceCanvas";
import { Vector3D } from "../VectorSystem/Vector3D";
import VirtualSlice from "../VirtualSlice";
import * as cornerstoneTools from 'cornerstone-tools';
import { assignWindowingedValueToPointOnVolume3DMaterial, calculatePixelValueAfterWindowing } from "../../Volume3D/windowingOnVolume3DMaterial";
import { checkPointIsForeground } from "../../Volume3D/manipulateGroundTruthOnVolume3D";

export const removeSliceOnVolume = (slice, matNVol) => {
  drawOrRemoveSliceOnVolume(slice, matNVol, false);
}

export const drawSliceOnVolume = (slice, matNVol) => {
  drawOrRemoveSliceOnVolume(slice, matNVol, true);
}

export const drawSliceOnCornerstoneElement = (slice, matNVol, cornerstoneElementRef) => {
  drawSliceOnVirtualSliceCanvas(slice, matNVol);

  displayImageOnCornerstoneElementFromVirtualSliceCanvas(cornerstoneElementRef).then(
    () => applyAnnotationOnCornerstoneElement(slice, matNVol, cornerstoneElementRef)
  );
}

export const removeAnnotationOnCornerstoneElement = (cornerstoneElementRef) => {
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
  matNVol.annotation.uniforms['u_data'].value.needsUpdate = true;
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

      if (checkPointBelongsToVolume(vec3D, matNVol.vol)) {
        //Mark the corresponding point on volume as slice.sliceInnerBrightness if isDraw, else mark it as its original value
        const flatIndex3D = vec3D.x + vec3D.y * matNVol.vol.xLength + vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;
        
        if (!checkPointIsForeground(matNVol, flatIndex3D)){
          if (isDraw) {
            annotatePointAsOnVirtualSlice(matNVol, flatIndex3D, slice);
          } else {
            assignWindowingedValueToPointOnVolume3DMaterial(matNVol, flatIndex3D);
          }
        }
      }
    }
  }
}

export const annotatePointAsOnVirtualSlice = (matNVol, position, slice) => {
  const sliceBrightnessUnclipped = calculatePixelValueAfterWindowing(matNVol, position) + slice.sliceOffset;

  const sliceBrightnessClipped = sliceBrightnessUnclipped > 1 ? 1 : sliceBrightnessUnclipped;
  
  matNVol.mat.uniforms['u_data'].value.image.data[position] = sliceBrightnessClipped;
  matNVol.annotation.uniforms['u_data'].value.image.data[position] = slice.sliceOffset;
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

      if (checkPointBelongsToVolume(vec3D, matNVol.vol)) {
        const flatIndex3D = vec3D.x +
                            vec3D.y * matNVol.vol.xLength +
                            vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;

        const flatIndex2D = vec2D.x +
                            vec2D.y * slice.sideLength;

        const valueOnVolume3DMaterial = calculatePixelValueAfterWindowing(matNVol, flatIndex3D);

        const intValue = Math.round(255 * valueOnVolume3DMaterial);

        imageArrayData[0 + 4 * flatIndex2D] = intValue;
        imageArrayData[1 + 4 * flatIndex2D] = intValue;
        imageArrayData[2 + 4 * flatIndex2D] = intValue;
      }
    }
  }
  
  putImageArrayDataOnVirtualSliceCanvas(slice, imageArrayData);
}

export const checkPointBelongsToVolume = (vec: Vector3D, vol) => {
  return vec.x >= 0 && vec.x <= vol.xLength - 1
      && vec.y >= 0 && vec.y <= vol.yLength - 1
      && vec.z >= 0 && vec.z <= vol.zLength - 1;
}

const putImageArrayDataOnVirtualSliceCanvas = (slice, imageArrayData) => {
  const imageData = new ImageData(imageArrayData, slice.sideLength, slice.sideLength)

  const canvas = document.getElementById('vs') as HTMLCanvasElement;

  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = slice.sideLength;
  canvas.height = slice.sideLength;
  
  ctx.putImageData(imageData, 0, 0);
}