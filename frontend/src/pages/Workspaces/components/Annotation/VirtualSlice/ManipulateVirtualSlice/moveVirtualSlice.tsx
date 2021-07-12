import { drawSliceOnCanvas, drawSliceOnVolume, removeSliceOnVolume, updateSliceState } from "./virtualSliceUtils";


const moveSlice = (sliceRef, matNVol, event) => {
  event.preventDefault();
  removeSliceOnVolume(sliceRef.current, matNVol);
  updateSliceState(sliceRef.current, event);
  drawSliceOnCanvas(sliceRef.current, matNVol);
  drawSliceOnVolume(sliceRef.current, matNVol);
  matNVol.mat.uniforms['u_data'].value.needsUpdate = true;
}

export default  moveSlice;