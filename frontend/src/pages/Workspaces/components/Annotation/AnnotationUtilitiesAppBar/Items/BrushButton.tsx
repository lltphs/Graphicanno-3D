import { Button } from '@material-ui/core';
import { mdiBrush } from '@mdi/js';
import Icon from '@mdi/react';
import * as cornerstoneTools from 'cornerstone-tools';
import { Vector2D } from '../../VirtualSlice/VectorSystem/Vector2D';
import { Vector3D } from '../../VirtualSlice/VectorSystem/Vector3D';

const BrushButton = ({ matNVol, sliceRef, cornerstoneElementRef }) => (
  <Button className="item-btn"
    onClick={() => handleBrush(matNVol, sliceRef, cornerstoneElementRef)}
  >
    <Icon path={mdiBrush} id="zoom-in" className="item-icon" />
    <br />
    Brush
  </Button>
);

const handleBrush = (matNVol, sliceRef, cornerstoneElementRef) => {
  const {
    getters,
    setters
  } = cornerstoneTools.getModule('segmentation');
  
  cornerstoneTools.setToolActive('Brush', {mouseButtonMask: 1});
  const labelmap2D = getters.labelmap2D(cornerstoneElementRef.current);
  setters.activeSegmentIndex(cornerstoneElementRef.current, 999);
  
  const arrayPixel = labelmap2D.labelmap2D.pixelData;

  let imageSideLength = Math.round(Math.sqrt(arrayPixel.length));

  for (let flatPosition = 0; flatPosition < arrayPixel.length; flatPosition++){
    if (arrayPixel[flatPosition] === 999){
      let vec2D = (new Vector2D(flatPosition % imageSideLength, Math.floor(flatPosition / imageSideLength))).add(sliceRef.current.O2D.scalarMul(-1));

      let vec3D = sliceRef.current.O3D.add(sliceRef.current.u3D.scalarMul(vec2D.x)).add(sliceRef.current.v3D.scalarMul(vec2D.y)).round();

      if (checkPointIsInVolume(vec3D, matNVol.vol)) {
        let flatIndex3D = vec3D.x + vec3D.y * matNVol.vol.xLength + vec3D.z * matNVol.vol.xLength * matNVol.vol.yLength;

        matNVol.mat.uniforms['u_data'].value.image.data[flatIndex3D] = 1;
      }
    }
  }
  matNVol.mat.uniforms['u_data'].value.needsUpdate = true;
}

const checkPointIsInVolume = (vec: Vector3D, vol) => {
  return vec.x >= 0 && vec.x < vol.xLength
      && vec.y >= 0 && vec.y < vol.yLength
      && vec.z >= 0 && vec.z < vol.zLength;
}

export default BrushButton;