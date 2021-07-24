import { Button } from '@material-ui/core';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import * as cornerstone from 'cornerstone-core';

const SmoothButton = ({ matNVol }) => (
  <Button className="item-btn"
    onClick={()=>handleSmooth(matNVol)}>
    <Brightness5Icon id="zoom-in" className="item-icon" />
    <br/>
    Remove Background
  </Button>
);

const handleSmooth = (matNVol) => {
}

export default SmoothButton;