import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import extractAnnotationFromVolume3D from "../../Volume3D/extractAnnotationFromVolume3D";
import { updateAnnotation } from 'api/dataset'
import { useParams } from 'react-router-dom';

const SaveYourWorkButton = ({ matNVol }) => {
  const { datasetId } = useParams<{datasetId: string}>()

  return(
    <div id="save_your_work" onClick={()=>handleSaveYourWork(matNVol, datasetId)}>
      <ListItem button id='save_your_work_fake_tag' className="item">
        <Tooltip title="Save your mask">
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
        </Tooltip>
        <ListItemText/>
      </ListItem>
    </div>
  )
};

const handleSaveYourWork = (matNVol, datasetId) => {
  const annotation = extractAnnotationFromVolume3D(matNVol);

  updateAnnotation(datasetId, annotation);
}

export default SaveYourWorkButton;