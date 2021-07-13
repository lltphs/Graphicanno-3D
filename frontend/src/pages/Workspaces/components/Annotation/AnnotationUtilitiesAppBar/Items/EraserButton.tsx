import { Button } from '@material-ui/core';
import { mdiEraser } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';

const EraserButton = () => (
  <Button className="item-btn"
    onClick={handleEraser}
  >
    <Icon path={mdiEraser} id="zoom-in" className="item-icon" />
    <br/>
    Eraser
  </Button>
);

const handleEraser = () => {
  cornerstoneTools.setToolActive('Eraser', {mouseButtonMask: 1});
}

export default EraserButton;