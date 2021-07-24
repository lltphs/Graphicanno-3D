import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import applyWindowingOnVolume3DMaterial from '../../Volume3D/windowingOnVolume3DMaterial';
import { Typography } from '@material-ui/core';

const WindowingSlider = ({ matNVol, sliceRef, cornerstoneElementRef }) => {

  const [value, setValue] = useState<number[]>([0, 1]);

  const valueText = (value) => `${value}`;

  const handleSlider = (_, value) => {
    applyWindowingOnVolume3DMaterial(matNVol, sliceRef, cornerstoneElementRef, value[0], value[1]);
    
    setValue(value);
  }

  return (
    <div style={{width:"15%", paddingTop:"2%"}}>
      <Slider
        value={value}
        min={0}
        max={1}
        step={0.01}
        onChange={handleSlider}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valueText}
      />
      <Typography color="textPrimary" gutterBottom align="center">
        HU Window
      </Typography>
    </div>
  );
};

export default WindowingSlider;