import { annotatePointAsNotOnVirtualSlice, drawSliceOnCornerstoneElement, drawSliceOnVolume, notifyVolume3DUpdate } from "../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";

const applyWindowingOnVolume3DMaterial = (matNVol, sliceRef, cornerstoneElementRef, lower, upper) => {
  updateMatNVolWindowingBound(matNVol, lower, upper);

  for (let i = 0; i < matNVol.vol.data.length; i++) {
    annotatePointAsNotOnVirtualSlice(matNVol, i);
  }

  drawSliceOnVolume(sliceRef.current, matNVol);

  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);

  notifyVolume3DUpdate(matNVol);
}
const updateMatNVolWindowingBound = (matNVol, lower, upper) => {
  matNVol.windowingBound.low = lower;
  matNVol.windowingBound.high = upper;
}

export const calculatePixelValueAfterWindowing = (matNVol, position, forVirtualSlice = false) => {
  if (checkPointIsInWindowingRange(matNVol, position)) {
    let actualValue = matNVol.vol.data[position];
    if (forVirtualSlice) {
      return (actualValue - matNVol.windowingBound.low) / (matNVol.windowingBound.high - matNVol.windowingBound.low);
    } else {
      return actualValue;
    }
  } else {
    return 0;
  }
}

const checkPointIsInWindowingRange = (matNVol, position) => {
  return matNVol.vol.data[position] >= matNVol.windowingBound.low
      && matNVol.vol.data[position] <= matNVol.windowingBound.high;
}

export default applyWindowingOnVolume3DMaterial;