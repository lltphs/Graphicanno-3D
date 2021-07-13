import { Button } from '@material-ui/core';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import * as cornerstone from 'cornerstone-core';

const InverButton = ({ cornerstoneElementRef }) => (
  <Button className="item-btn"
    onClick={()=>handleInvert(cornerstoneElementRef)}>
    <Brightness5Icon id="zoom-in" className="item-icon" />
    <br/>
    Invert
  </Button>
);

const handleInvert = (cornerstoneElementRef) => {
  let viewport = cornerstone.getViewport(cornerstoneElementRef.current);
  viewport.invert = !viewport.invert;
  cornerstone.setViewport(cornerstoneElementRef.current, viewport);
}

export default InverButton;