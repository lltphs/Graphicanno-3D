import { Button } from '@material-ui/core';
import { mdiRectangleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';

const RectangleButton = () => (
  <Button className="item-btn"
    onClick={handleRectangle}
  >
    <Icon path={mdiRectangleOutline} id="zoom-in" className="item-icon" />
    <br />
    Rectangle
  </Button>
);

const handleRectangle = () => {
  cornerstoneTools.setToolActive('RectangleScissors', {mouseButtonMask: 1});
}

export default RectangleButton;