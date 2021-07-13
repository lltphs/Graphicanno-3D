import { Button } from '@material-ui/core';
import { mdiEllipse } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';

const EllipseButton = () => (
  <Button className="item-btn"
    onClick={handleEllipse}
  >
    <Icon path={mdiEllipse} id="zoom-in" className="item-icon" />
    <br />
    Ellipse
  </Button>
);

const handleEllipse = () => {
  cornerstoneTools.setToolActive('EllipticalRoi', {mouseButtonMask: 1});
}

export default EllipseButton;