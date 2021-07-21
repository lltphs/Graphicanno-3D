import { drawSliceOnVolume, notifyVolume3DUpdate } from "../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";
import { calculateValueAfterWindowing, checkPointIsInWindowingRange } from "./windowingOnVolume3DMaterial";

const applyAnnotationOnVolumeFromExternalSource = (slice, matNVol, annotation) => {
  for (let i = 0; i < annotation.length; i++) {
    if (annotation[i] > 0) {
      matNVol.mat.uniforms['u_data'].value.image.data[i] = annotation[i];
    } else {
      let pixelValue;
      if (checkPointIsInWindowingRange(matNVol, i, slice.slicePixelValueLowerBound, slice.slicePixelValueUpperBound)) {
        pixelValue = calculateValueAfterWindowing(matNVol.vol.data[i], slice.slicePixelValueLowerBound, slice.slicePixelValueUpperBound);
      } else {
        pixelValue = 0;
      }
      matNVol.mat.uniforms['u_data'].value.image.data[i] = pixelValue;
    }
  }
  drawSliceOnVolume(slice, matNVol);

  notifyVolume3DUpdate(matNVol);
}

export default applyAnnotationOnVolumeFromExternalSource;