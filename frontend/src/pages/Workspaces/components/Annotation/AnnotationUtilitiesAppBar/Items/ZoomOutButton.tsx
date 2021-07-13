import { Button } from '@material-ui/core';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';

const ZoomOutButton = ({ cornerstoneElementRef }) => (
  <Button className="item-btn"
    onClick = {() => handleZoomOut(cornerstoneElementRef)}
  >
    <ZoomOutIcon id="zoom-in" className="item-icon"/>
    <br/>
    Zoom Out
  </Button>
);

const handleZoomOut = (cornerstoneElementRef) => {
  cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1});
  let currentViewport = cornerstone.getViewport(cornerstoneElementRef.current);
  currentViewport.scale -= 0.1;
  cornerstone.setViewport(cornerstoneElementRef.current, currentViewport);
}

export default ZoomOutButton;