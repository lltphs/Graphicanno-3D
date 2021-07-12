import VirtualSlice from "../VirtualSlice";
import {drawSliceOnVolume, drawSliceOnCanvas} from './virtualSliceUtils';

const createSlice = (sliceRef, matNVol) => {
  sliceRef.current = new VirtualSlice(matNVol.vol);
  drawSliceOnCanvas(sliceRef.current, matNVol);
  drawSliceOnVolume(sliceRef.current, matNVol);
  matNVol.mat.uniforms['u_data'].value.needsUpdate = true;
}

export default createSlice;