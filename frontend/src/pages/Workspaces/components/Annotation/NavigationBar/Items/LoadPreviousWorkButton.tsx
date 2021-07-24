import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import { drawSliceOnCornerstoneElement } from "../../VirtualSlice/ManipulateVirtualSlice/virtualSliceUtils";
import applyAnnotationOnVolumeFromExternalSource from "../../Volume3D/applyAnnotationOnVolumeFromExternalSource";
import { useParams } from 'react-router-dom';

import { getAnnotation } from 'api/dataset'

const LoadPreviousWorkButton = ({ sliceRef, matNVol, cornerstoneElementRef }) => {
  const { datasetId } = useParams<{datasetId: string}>()

  return (
    <div id="load_ai_prediction" onClick={() => handleLoadOldWorkButton(sliceRef, matNVol, cornerstoneElementRef, datasetId)}>
      <ListItem button id='load_ai_prediction_fake_tag' className="item">
          <Tooltip title="Load your previous work">
            <ListItemIcon>
              <GetAppIcon/>
            </ListItemIcon>
          </Tooltip>
          <ListItemText/>
      </ListItem>
    </div>
  )
};

const handleLoadOldWorkButton = (sliceRef, matNVol, cornerstoneElementRef, datasetId) => {
  const annotation = getAnnotation(datasetId);
  
  applyAnnotationOnVolumeFromExternalSource(sliceRef.current, matNVol, annotation.data);
  
  drawSliceOnCornerstoneElement(sliceRef.current, matNVol, cornerstoneElementRef);
}

export default LoadPreviousWorkButton;
