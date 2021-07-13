import { Button } from '@material-ui/core';
import { mdiAngleAcute } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';

const AngleButton = () => (
  <Button className="item-btn"
    onClick={handleAngle}
  >
    <Icon path={mdiAngleAcute} id="zoom-in" className="item-icon" />
    <br/>
    Angle
  </Button>
);


const handleAngle = () => {
  cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 });
}

export default AngleButton;