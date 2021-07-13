import { Button } from '@material-ui/core';
import { Icon } from '@mdi/react';
import { mdiCursorPointer } from '@mdi/js';
import * as cornerstoneTools from 'cornerstone-tools';

const PanButton = () => (
  <Button className="item-btn"
    onClick={handlePan}
  >
    <Icon path={mdiCursorPointer} id="zoom-in" className="item-icon" />
    <br/>
    Pan
  </Button>
);

const handlePan = () => {
  cornerstoneTools.setToolActive('Pan', {mouseButtonMask: 1});
}

export default PanButton;