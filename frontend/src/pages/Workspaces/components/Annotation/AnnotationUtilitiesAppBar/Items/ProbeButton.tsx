import { Button } from '@material-ui/core';
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled';
import * as cornerstoneTools from 'cornerstone-tools';

const ProbeButton = () => (
  <Button className="item-btn"
    onClick={handleProbe}
  >
    <LocationDisabledIcon id="zoom-in" className="item-icon" />
    <br />
    Probe
  </Button>
);

const handleProbe = () => {
  cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 });
}

export default ProbeButton;