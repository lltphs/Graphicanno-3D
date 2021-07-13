import { Button } from '@material-ui/core';
import { Icon } from '@mdi/react';
import { mdiCheckboxIntermediate } from '@mdi/js';
import * as cornerstoneTools from 'cornerstone-tools';

const MagnifyButton = () => (
  <Button className="item-btn"
    onClick={handleMagnify}
  >
    <Icon path={mdiCheckboxIntermediate} id="zoom-in" className="item-icon" />
    <br />
    Magnify
  </Button>
);

const handleMagnify = () => {
  cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 });
}

export default MagnifyButton;