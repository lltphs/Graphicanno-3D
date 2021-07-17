import { Button } from '@material-ui/core';
import { mdiCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';

const CircleButton = () => (
  <Button className="item-btn"
    onClick={handleCircle}
  >
    <Icon path={mdiCircleOutline} id="zoom-in" className="item-icon" />
    <br />
    Circle
  </Button>
);

const handleCircle = () => {
  cornerstoneTools.setToolActive('CircleScissors', {mouseButtonMask: 1});
}

export default CircleButton;