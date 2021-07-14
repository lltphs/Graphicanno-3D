import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import { useLoader } from "@react-three/fiber";
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import applyAnnotationOnVolumeFromExternalSource from "../../Volume3D/applyAnnotationOnVolumeFromExternalSource";

const LoadAIPredictionButton = ({ matNVol, nrrdUrl }) => (
  <div id="load_ai_prediction" onClick={() => handleLoadAIPrediction(matNVol, nrrdUrl)}>
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

const handleLoadAIPrediction = (matNVol, nrrdUrl) => {
  const volume = useLoader(NRRDLoader, nrrdUrl);
  applyAnnotationOnVolumeFromExternalSource(matNVol, volume.data);
}

export default LoadAIPredictionButton;
