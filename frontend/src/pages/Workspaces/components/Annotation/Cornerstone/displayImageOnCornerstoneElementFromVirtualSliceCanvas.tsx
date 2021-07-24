import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import { Vector3D } from '../VirtualSlice/VectorSystem/Vector3D';
import { checkPointIsForeground } from '../Volume3D/manipulateGroundTruthOnVolume3D';

const displayImageOnCornerstoneElementFromVirtualSliceCanvas = async (cornerstoneElementRef) => {
  const image = await cornerstone.loadImage('_');

  cornerstone.displayImage(cornerstoneElementRef.current, image);
}

export const applyAnnotationOnCornerstoneElement = ( slice, matNVol, cornerstoneElementRef ) => {
  const {
    getters
  } = cornerstoneTools.getModule('segmentation');
  
  const labelmap2D = getters.labelmap2D(cornerstoneElementRef.current);

  const arrayPixel = labelmap2D.labelmap2D.pixelData;

  //Origin locates in the center of slice, so both ends of 2 side are half-length away from the origin
  const halfSideLength = Math.floor(slice.sideLength / 2);

  //Start and arrive at each end of each side
  for (let i = -halfSideLength; i < halfSideLength; i++){
    for (let j = -halfSideLength; j < halfSideLength; j++){
      //vec3D = O3D + i * u3D + j * v3D
      const vec3D = slice.O3D.add(slice.u3D.scalarMul(i)).add(slice.v3D.scalarMul(j)).round();

      //vec2D = O2D + i * u2D + j * v2D
      const vec2D = slice.O2D.add(slice.u2D.scalarMul(i)).add(slice.v2D.scalarMul(j)).round();

      if (checkPointIsInVolume(vec3D, matNVol.vol)) {
        const flatIndex3D = vec3D.x +
                            vec3D.y * matNVol.vol.xLength +
                            vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;

        const flatIndex2D = vec2D.x +
                            vec2D.y * slice.sideLength;

        if (checkPointIsForeground(matNVol, flatIndex3D)) {
          arrayPixel[flatIndex2D] = 1;
        }
      }
    }
  }
}

const checkPointIsInVolume = (vec: Vector3D, vol) => {
  return vec.x >= 0 && vec.x <= vol.xLength - 1
      && vec.y >= 0 && vec.y <= vol.yLength - 1
      && vec.z >= 0 && vec.z <= vol.zLength - 1;
}

export default displayImageOnCornerstoneElementFromVirtualSliceCanvas;