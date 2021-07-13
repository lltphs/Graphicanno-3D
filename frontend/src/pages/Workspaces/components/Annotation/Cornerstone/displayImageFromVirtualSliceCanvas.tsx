import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';

const displayImageFromVirtualSliceCanvas = async (cornerstoneElementRef) => {
  const image = await cornerstone.loadImage('_');
  const stack = {
    imageIds: ['_'],
    currentImageIdIndex: 0
  };		
  cornerstoneTools.clearToolState(cornerstoneElementRef.current, "stack");
  cornerstoneTools.addStackStateManager(cornerstoneElementRef.current, ["stack"]);
  cornerstoneTools.addToolState(cornerstoneElementRef.current, "stack", stack);

  cornerstone.displayImage(cornerstoneElementRef.current, image);
}

export default displayImageFromVirtualSliceCanvas;