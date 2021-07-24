import { drawSliceOnVolume, notifyVolume3DUpdate } from "../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";
import { annotatePointAsBackground, annotatePointAsForeground } from "./manipulateGroundTruthOnVolume3D";

const applyAnnotationOnVolumeFromExternalSource = (slice, matNVol, externalAnnotation) => {
  for (let i = 0; i < externalAnnotation.length; i++) {
    if (externalAnnotation[i] > 0) {
      annotatePointAsForeground(matNVol, i);
    } else {
      annotatePointAsBackground(matNVol, i);
    }
  }
  drawSliceOnVolume(slice, matNVol);

  notifyVolume3DUpdate(matNVol);
}

export default applyAnnotationOnVolumeFromExternalSource;