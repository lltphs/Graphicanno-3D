import Hammer from 'hammerjs';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from'cornerstone-math';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';

const setupCornerstone = (cornerstoneElementRef) => {
  setupCornerstoneTools(cornerstoneElementRef);

  setupCornerstoneWebImageLoader();
}

const enableCornerstoneElement = (cornerstoneElementRef) => {
  cornerstone.enable(cornerstoneElementRef.current);
}

const setupCornerstoneTools = (cornerstoneElementRef) => {
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.init();

  enableCornerstoneElement(cornerstoneElementRef);

  const stack = {
    imageIds: ['_'],
    currentImageIdIndex: 0
  };		
  cornerstoneTools.clearToolState(cornerstoneElementRef.current, "stack");
  cornerstoneTools.addStackStateManager(cornerstoneElementRef.current, ["stack"]);
  cornerstoneTools.addToolState(cornerstoneElementRef.current, "stack", stack);
  
  addToolsForCornerstoneTools();
}

const setupCornerstoneWebImageLoader = () => {
  cornerstoneWebImageLoader.external.cornerstone = cornerstone;
}

const addToolsForCornerstoneTools = () => {
  cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
  cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
  cornerstoneTools.addTool(cornerstoneTools.MagnifyTool);
  cornerstoneTools.addTool(cornerstoneTools.AngleTool);
  cornerstoneTools.addTool(cornerstoneTools.LengthTool);
  cornerstoneTools.addTool(cornerstoneTools.PanTool);
  cornerstoneTools.addTool(cornerstoneTools.ProbeTool);
  cornerstoneTools.addTool(cornerstoneTools.EllipticalRoiTool);
  cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
  cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
  cornerstoneTools.addTool(cornerstoneTools.EraserTool);
  cornerstoneTools.addTool(cornerstoneTools.BrushTool);
  cornerstoneTools.addTool(cornerstoneTools.CorrectionScissorsTool);
}


export default setupCornerstone;

