import Slider from '@material-ui/core/Slider';
import { useState } from 'react';
import applyWindowingOnVolume3DMaterial from '../../Volume3D/windowingOnVolume3DMaterial';
import { Typography } from '@material-ui/core';

const WindowingSlider = ({ matNVol, sliceRef, cornerstoneElementRef }) => {

  const [value, setValue] = useState<number[]>([-1024, 1023]);

  const valueText = (value) => `${value} HU`;

  const handleSlider = (_, value) => {
    applyWindowingOnVolume3DMaterial(matNVol, sliceRef, cornerstoneElementRef, (value[0] + 1024) / 2047, (value[1] + 1024) / 2047);
    
    setValue(value);
  }

  return (
    <div style={{width:"20%", paddingTop:"2%"}}>
      <Slider
        value={value}
        min={-1024}
        max={1023}
        step={1}
        onChange={handleSlider}
        valueLabelDisplay="on"
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