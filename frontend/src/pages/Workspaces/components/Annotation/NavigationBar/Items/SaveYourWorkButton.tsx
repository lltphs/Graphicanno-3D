import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import extractAnnotationFromVolume from "../../Volume3D/extractAnnotationFromVolume";

const SaveYourWorkButton = ({ matNVol, storageUrl }) => (
  <div id="save_your_work" onClick={()=>handleSaveYourWork(matNVol, storageUrl)}>
    <ListItem button id='save_your_work_fake_tag' className="item">
      <Tooltip title="Save your mask">
        <ListItemIcon>
          <GetAppIcon/>
        </ListItemIcon>
      </Tooltip>
      <ListItemText/>
    </ListItem>
  </div>
);

const handleSaveYourWork = (matNVol, storageUrl) => {
  const annotation = extractAnnotationFromVolume(matNVol);

  uploadWorkToServer(annotation, storageUrl);
}

const uploadWorkToServer = (annotation, storageUrl) => {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', storageUrl);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(JSON.stringify(annotation));
}

export default SaveYourWorkButton;