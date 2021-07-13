import { Button } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';

const ZoomInButton = ({ cornerstoneElementRef }) => (
  <Button className="item-btn"
    onClick={() => handleZoomIn(cornerstoneElementRef)}
  >
    <ZoomInIcon id="zoom-in" className="item-icon" />
    <br />
    Zoom In
  </Button>
);

const handleZoomIn = (cornerstoneElementRef): any => {
  cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1})
  let currentViewport = cornerstone.getViewport(cornerstoneElementRef.current)
  currentViewport.scale += 0.1
  cornerstone.setViewport(cornerstoneElementRef.current, currentViewport)
}

export default ZoomInButton;