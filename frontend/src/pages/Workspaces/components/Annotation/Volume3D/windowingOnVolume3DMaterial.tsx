import { drawSliceOnCornerstoneElement, drawSliceOnVolume, notifyVolume3DUpdate } from "../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";
import { checkPointIsForeground } from "./manipulateForegroundOnVolume3D";

const applyWindowingOnVolume3DMaterial = (matNVol, sliceRef, cornerstoneElementRef, lower, upper) => {
  updateMatNVolWindowingBound(matNVol, lower, upper);

  for (let i = 0; i < matNVol.vol.data.length; i++) {
    if (!checkPointIsForeground(matNVol, i)) {
      assignWindowingedValueToPointOnVolume3DMaterial(matNVol, i);
    }
  }

  notifyVolume3DUpdate(matNVol);

  drawSliceOnVolume(sliceRef.current, matNVol);

  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
}
const updateMatNVolWindowingBound = (matNVol, lower, upper) => {
  matNVol.windowingBound.low = lower;
  matNVol.windowingBound.high = upper;
}

export const assignWindowingedValueToPointOnVolume3DMaterial = (matNVol, position) => {
  let pixelValue = calculatePixelValueAfterWindowing(matNVol, position);

  matNVol.mat.uniforms['u_data'].value.image.data[position] = pixelValue;
}

export const calculatePixelValueAfterWindowing = (matNVol, position) => {
  if (checkPointIsInWindowingRange(matNVol, position)) {
    let actualValue = matNVol.vol.data[position];
    return 0.5 * (actualValue - matNVol.windowingBound.low) / (matNVol.windowingBound.high - matNVol.windowingBound.low);
  } else {
    return 0;
  }
}

const checkPointIsInWindowingRange = (matNVol, position) => {
  return matNVol.vol.data[position] >= matNVol.windowingBound.low
      && matNVol.vol.data[position] <= matNVol.windowingBound.high;
}

export default applyWindowingOnVolume3DMaterial;