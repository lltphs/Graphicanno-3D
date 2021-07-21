import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import extractAnnotationFromVolume from "../../Volume3D/extractAnnotationFromVolume";
import { updateAnnotation } from 'api/dataset'
import { useParams } from 'react-router-dom';

const SaveYourWorkButton = ({ matNVol }) => {
  const { datasetId } = useParams<{datasetId: string}>()

  return(
    <div id="save_your_work" onClick={()=>handleSaveYourWork(matNVol, datasetId)}>
      <ListItem button id='save_your_work_fake_tag' className="item">
        <Tooltip title="Save your mask">
          <ListItemIcon>
            <GetAppIcon/>
          </ListItemIcon>
        </Tooltip>
        <ListItemText/>
      </ListItem>
    </div>
  )
};

const handleSaveYourWork = (matNVol, datasetId) => {
  const annotation = extractAnnotationFromVolume(matNVol);

  updateAnnotation(datasetId, annotation);
}

export default SaveYourWorkButton;