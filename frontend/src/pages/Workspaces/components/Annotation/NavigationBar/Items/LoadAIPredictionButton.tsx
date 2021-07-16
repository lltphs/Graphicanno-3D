import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import { useLoader } from "@react-three/fiber";
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { drawSliceOnCornerstoneElement } from "../../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";
import applyAnnotationOnVolumeFromExternalSource from "../../Volume3D/applyAnnotationOnVolumeFromExternalSource";

const LoadAIPredictionButton = ({ sliceRef, matNVol, cornerstoneElementRef, nrrdUrl }) => (
  <div id="load_ai_prediction" onClick={() => handleLoadAIPrediction(sliceRef, matNVol, cornerstoneElementRef, nrrdUrl)}>
    <ListItem button id='load_ai_prediction_fake_tag' className="item">
        <Tooltip title="AI prediction">
          <ListItemIcon>
            <FontDownloadIcon/>
          </ListItemIcon>
        </Tooltip>
        <ListItemText/>
    </ListItem>
  </div>
);

const handleLoadAIPrediction = (sliceRef, matNVol, cornerstoneElementRef, nrrdUrl) => {
  const volume = useLoader(NRRDLoader, nrrdUrl);
  console.log(volume.xLength)
  console.log(volume.yLength)
  console.log(volume.zLength)
  applyAnnotationOnVolumeFromExternalSource(matNVol, volume.data);
  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
}

export default LoadAIPredictionButton;
