import { drawSliceOnCornerstoneElement, drawSliceOnVolume, notifyVolume3DUpdate } from "../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";

const windowingOnVolume3DMaterial = (matNVol, sliceRef, cornerstoneElementRef, lower, upper) => {
  updateSlicePixelValueBound(sliceRef, lower, upper);

  for (let i = 0; i < matNVol.vol.data.length; i++) {
    if (!checkPointIsAnnotated(matNVol, i)) {
      if (checkPointIsInWindowingRange(matNVol, i, lower, upper)) {
        matNVol.mat.uniforms['u_data'].value.image.data[i] = calculateValueAfterWindowing(matNVol.vol.data[i], lower, upper);
      } else {
        matNVol.mat.uniforms['u_data'].value.image.data[i] = 0;
      }
    }
  }
  notifyVolume3DUpdate(matNVol);

  drawSliceOnVolume(sliceRef.current, matNVol);

  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
}
const updateSlicePixelValueBound = (sliceRef, lower, upper) => {
  sliceRef.current.slicePixelValueLowerBound = lower;
  sliceRef.current.slicePixelValueUpperBound = upper;
}

const checkPointIsAnnotated = (matNVol, position) => {
  return matNVol.mat.uniforms['u_data'].value.image.data[position] == 1;
}

export const checkPointIsInWindowingRange = (matNVol, position, lower, upper) => {
  return matNVol.vol.data[position] >= lower
      && matNVol.vol.data[position] <= upper;
}

export const calculateValueAfterWindowing = (valueBeforeWindowing, lower, upper) => {
  return 0.9 * (valueBeforeWindowing - lower) / (upper - lower);
}
export default windowingOnVolume3DMaterial;