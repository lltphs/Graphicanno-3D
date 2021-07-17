import Hammer from 'hammerjs';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from'cornerstone-math';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import { Vector2D } from '../VirtualSlice/VectorSystem/Vector2D';

const setupCornerstone = (sliceRef, matNVol, cornerstoneElementRef) => {
  setupCornerstoneTools(sliceRef, matNVol, cornerstoneElementRef);

  setupCornerstoneWebImageLoader();
}

const setupCornerstoneTools = (sliceRef, matNVol, cornerstoneElementRef) => {
  initializeCornerstoneTools();

  enableCornerstoneElement(cornerstoneElementRef);

  addStackToCornerstoneTools(cornerstoneElementRef);
  
  addToolsForCornerstoneTools();

  addMouseDragEventListenerToCornerstoneTools(sliceRef, matNVol, cornerstoneElementRef);
}

const setupCornerstoneWebImageLoader = () => {
  cornerstoneWebImageLoader.external.cornerstone = cornerstone;
}

const initializeCornerstoneTools = () => {
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.init();
}

const enableCornerstoneElement = (cornerstoneElementRef) => {
  cornerstone.enable(cornerstoneElementRef.current);
}

const addStackToCornerstoneTools = (cornerstoneElementRef) => {
  const stack = {
    imageIds: ['_'],
    currentImageIdIndex: 0
  };		
  cornerstoneTools.clearToolState(cornerstoneElementRef.current, "stack");
  cornerstoneTools.addStackStateManager(cornerstoneElementRef.current, ["stack"]);
  cornerstoneTools.addToolState(cornerstoneElementRef.current, "stack", stack);
}

const addToolsForCornerstoneTools = () => {
  cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
  cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
  cornerstoneTools.addTool(cornerstoneTools.MagnifyTool);
  cornerstoneTools.addTool(cornerstoneTools.AngleTool);
  cornerstoneTools.addTool(cornerstoneTools.LengthTool);
  cornerstoneTools.addTool(cornerstoneTools.PanTool);
  cornerstoneTools.addTool(cornerstoneTools.ProbeTool);
  cornerstoneTools.addTool(cornerstoneTools.CircleScissorsTool);
  cornerstoneTools.addTool(cornerstoneTools.RectangleScissorsTool);
  cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);
  cornerstoneTools.addTool(cornerstoneTools.EraserTool);
  cornerstoneTools.addTool(cornerstoneTools.BrushTool);
  cornerstoneTools.addTool(cornerstoneTools.CorrectionScissorsTool);
}

const addMouseDragEventListenerToCornerstoneTools = (sliceRef, matNVol, cornerstoneElementRef) => {
  const {
    getters
  } = cornerstoneTools.getModule('segmentation');
  
  cornerstoneElementRef.current.addEventListener(cornerstoneTools.EVENTS.MOUSE_DRAG,
    () => drawAnnotationOnVolume(getters, sliceRef, matNVol, cornerstoneElementRef)
  );
  
  cornerstoneElementRef.current.addEventListener(cornerstoneTools.EVENTS.MOUSE_UP,
    () => drawAnnotationOnVolume(getters, sliceRef, matNVol, cornerstoneElementRef)
  );
}


export const drawAnnotationOnVolume = (cornerstoneToolsGetters, sliceRef, matNVol, cornerstoneElementRef) => {
  const labelmap2D = cornerstoneToolsGetters.labelmap2D(cornerstoneElementRef.current);

  const arrayPixel = labelmap2D.labelmap2D.pixelData;

  let imageSideLength = Math.round(Math.sqrt(arrayPixel.length));

  for (let flatPosition = 0; flatPosition < arrayPixel.length; flatPosition++){
    let vec2D = (new Vector2D(flatPosition % imageSideLength, Math.floor(flatPosition / imageSideLength))).add(sliceRef.current.O2D.scalarMul(-1));

    let vec3D = sliceRef.current.O3D.add(sliceRef.current.u3D.scalarMul(vec2D.x)).add(sliceRef.current.v3D.scalarMul(vec2D.y)).round();

    if (checkPointIsInVolume(vec3D, matNVol.vol)) {
      let flatIndex3D = vec3D.x + vec3D.y * matNVol.vol.xLength + vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;

      if (arrayPixel[flatPosition] === 1){
        matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = 1;
      } else {
        matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = matNVol.vol.data[flatIndex3D];
      }
    }
  }
  
  matNVol.mat.uniforms['u_data'].value.needsUpdate = true;
};

const checkPointIsInVolume = (vec, vol) => {
  return vec.x >= 0 && vec.x < vol.xLength
      && vec.y >= 0 && vec.y < vol.yLength
      && vec.z >= 0 && vec.z < vol.zLength;
};

export default setupCornerstone;

