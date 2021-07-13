import VirtualSlice from "../VirtualSlice";
import {drawSliceOnVolume, drawSliceOnCornerstoneElement, notifyVolume3DUpdate} from './virtualSliceUtils';

const createVirtualSlice = (sliceRef, matNVol, cornerstoneElementRef) => {
  sliceRef.current = sliceRef.current || new VirtualSlice(matNVol.vol);
  drawSliceOnVolume(sliceRef.current, matNVol);
  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
  notifyVolume3DUpdate(matNVol);
}

export default createVirtualSlice;