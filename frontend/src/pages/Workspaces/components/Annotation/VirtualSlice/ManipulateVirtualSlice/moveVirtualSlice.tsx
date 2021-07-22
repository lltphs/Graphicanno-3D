import { drawSliceOnCornerstoneElement, drawSliceOnVolume, notifyVolume3DUpdate, removeAnnotationOnCornerstoneElement, removeSliceOnVolume, updateSliceState } from "./virtualSliceUtils";


const moveVirtualSlice = (sliceRef, matNVol, event, cornerstoneElementRef) => {
  removeSliceOnVolume(sliceRef.current, matNVol);
  updateSliceState(sliceRef.current, event);
  drawSliceOnVolume(sliceRef.current, matNVol);
  removeAnnotationOnCornerstoneElement(cornerstoneElementRef);
  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
  notifyVolume3DUpdate(matNVol);
}

export default  moveVirtualSlice;