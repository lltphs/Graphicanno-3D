import { drawSliceOnCornerstoneElement, drawSliceOnVolume, notifyVolume3DUpdate, removeOldAnnotation, removeSliceOnVolume, updateSliceState } from "./virtualSliceUtils";


const moveVirtualSlice = (sliceRef, matNVol, event, cornerstoneElementRef) => {
  event.preventDefault();
  removeSliceOnVolume(sliceRef.current, matNVol);
  updateSliceState(sliceRef.current, event);
  drawSliceOnVolume(sliceRef.current, matNVol);
  removeOldAnnotation(cornerstoneElementRef);
  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
  notifyVolume3DUpdate(matNVol);
}

export default  moveVirtualSlice;