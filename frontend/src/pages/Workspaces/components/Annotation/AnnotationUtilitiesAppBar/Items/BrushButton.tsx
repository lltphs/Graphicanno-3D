import { Button } from '@material-ui/core';
import { mdiBrush } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';

const BrushButton = () : JSX.Element => (
    <div>
      <Button className="item-btn"
        onClick={handleBrush}
      >
        <Icon path={mdiBrush} id="zoom-in" className="item-icon"/>
        <br />
        Brush
      </Button>
    </div>
    
);
 
const handleBrush = () => {
  cornerstoneTools.setToolActive('Brush', {mouseButtonMask: 1});
};

export default BrushButton;