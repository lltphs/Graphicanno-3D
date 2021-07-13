import { Button } from '@material-ui/core';
import * as cornerstoneTools from 'cornerstone-tools';
import GestureIcon from '@material-ui/icons/Gesture';

const FreeHandButton = () => (
  <Button className="item-btn"
    onClick={handleFreeHand}
  >
    <GestureIcon id="zoom-in" className="item-icon"/>
    <br/>
    FreeHand
  </Button>	
);

const handleFreeHand = () => {
  cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 });
}

export default FreeHandButton;