import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import { useLoader } from "@react-three/fiber";
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { drawSliceOnCornerstoneElement } from "../../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";
import applyAnnotationOnVolumeFromExternalSource from "../../Volume3D/applyAnnotationOnVolumeFromExternalSource";
import { useParams } from 'react-router-dom';

import { getAnnotation } from 'api/dataset'

const LoadAIPredictionButton = ({ sliceRef, matNVol, cornerstoneElementRef, nrrdUrl }) => {
  const { datasetId } = useParams<{datasetId: string}>()

  return (
    <div id="load_ai_prediction" onClick={() => handleLoadAIPrediction(sliceRef, matNVol, cornerstoneElementRef, datasetId)}>
      <ListItem button id='load_ai_prediction_fake_tag' className="item">
          <Tooltip title="AI prediction">
            <ListItemIcon>
              <FontDownloadIcon/>
            </ListItemIcon>
          </Tooltip>
          <ListItemText/>
      </ListItem>
    </div>
  )
};

const handleLoadAIPrediction = (sliceRef, matNVol, cornerstoneElementRef, datasetId) => {
  const volume = getAnnotation(datasetId);

  applyAnnotationOnVolumeFromExternalSource(matNVol, volume.data);
  
  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
}

export default LoadAIPredictionButton;
