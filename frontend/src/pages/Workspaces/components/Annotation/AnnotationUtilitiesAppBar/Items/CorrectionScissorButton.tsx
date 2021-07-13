import { Button } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiScissorsCutting } from '@mdi/js';
import * as cornerstoneTools from 'cornerstone-tools';

const CorrectionScissorButton = () => (
  <Button className="item-btn"
    onClick={handleCorrectionScissor}
  >
    <Icon path={mdiScissorsCutting} id="zoom-in" className="item-icon"/>
    <br/>
    Scissor
  </Button>
);

const handleCorrectionScissor = () => {
  cornerstoneTools.setToolActive('CorrectionScissors', {mouseButtonMask: 1});
}

export default CorrectionScissorButton;