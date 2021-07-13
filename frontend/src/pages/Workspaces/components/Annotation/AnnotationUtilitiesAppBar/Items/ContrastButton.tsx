import { Button } from '@material-ui/core';
import * as cornerstoneTools from 'cornerstone-tools';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const ContrastButton = () => (
  <Button className="item-btn"
    onClick={handleContrast}>
    <WbSunnyIcon id="zoom-in" className="item-icon" />
    <br />
    Contrast
  </Button>
);

const handleContrast = () => {
  cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 1});
}

export default ContrastButton;