import { drawSliceOnVolume, notifyVolume3DUpdate } from "../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";
import { annotatePointAsForeground } from "./manipulateForegroundOnVolume3D";
import { assignWindowingedValueToPointOnVolume3DMaterial } from "./windowingOnVolume3DMaterial";

const applyAnnotationOnVolumeFromExternalSource = (slice, matNVol, externalAnnotation) => {
  let minValue = 1;
  let maxValue = 0;
  for (let i = 0; i < externalAnnotation.length; i++) {
    if (externalAnnotation[i] > 0) {
      if (matNVol.vol.data[i] < minValue) {
        minValue = matNVol.vol.data[i];
      } else if (matNVol.vol.data[i] > maxValue) {
        maxValue = matNVol.vol.data[i];
      }
    }
  }
  console.log(minValue);
  console.log(maxValue);
  for (let i = 0; i < externalAnnotation.length; i++) {
    if (externalAnnotation[i] > 0) {
      annotatePointAsForeground(matNVol, i, minValue, maxValue);
    } else {
      assignWindowingedValueToPointOnVolume3DMaterial(matNVol, i);
    }
  }
  drawSliceOnVolume(slice, matNVol);

  notifyVolume3DUpdate(matNVol);
}

export default applyAnnotationOnVolumeFromExternalSource;