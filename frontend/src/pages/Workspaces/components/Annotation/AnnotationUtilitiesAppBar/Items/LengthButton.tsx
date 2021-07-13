import { Button } from '@material-ui/core';
import { Icon } from '@mdi/react';
import { mdiRuler } from '@mdi/js';
import * as cornerstoneTools from 'cornerstone-tools';

const LengthButton = () => (
  <Button className="item-btn"
    onClick={handleLength}
  >
    <Icon path={mdiRuler} id="zoom-in" className="item-icon" />
    <br/>
    Length
  </Button>
);

const handleLength = () => {
  cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
}

export default LengthButton;