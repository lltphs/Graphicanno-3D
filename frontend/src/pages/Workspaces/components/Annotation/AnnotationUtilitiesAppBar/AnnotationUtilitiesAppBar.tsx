import { AppBar, Toolbar } from '@material-ui/core';

import { useState } from 'react';

import useStyles from '../Style/Style';

import AngleButton from './Items/AngleButton';
import BrushButton from './Items/BrushButton';
import ContrastButton from './Items/ContrastButton';
import CircleButton from './Items/CircleButton';
import EraserButton from './Items/EraserButton';
import FreeHandButton from './Items/FreeHandButton';
import InverButton from './Items/InvertButton';
import LengthButton from './Items/LengthButton';
import MagnifyButton from './Items/MagnifyButton';
import PanButton from './Items/PanButton';
import ProbeButton from './Items/ProbeButton';
import RectangleButton from './Items/RectangleButton';
import CorrectionScissorButton from './Items/CorrectionScissorButton';
import UndoButton from './Items/UndoButton';
import ZoomInButton from './Items/ZoomInButton';
import ZoomOutButton from './Items/ZoomOutButton';


import Slider from '@material-ui/core/Slider';
import { setSizeIcon } from 'store/actions/settings';

import * as cornerstoneTools from 'cornerstone-tools';

const AnnotationUtilitiesAppBar = ({ matNVol, sliceRef, cornerstoneElementRef }) => {
  const classes = useStyles();

  const [isShow, setShow] = useState(false);
  const [value, setValue] = useState(3);

  const enableShow = (event, clicked, newValue) => {
    setShow(!isShow)
  };

  const valueText = (value) => {
    return `${value}px`
  } 

  const setSize = (event, newValue) => {
    setValue(newValue);
    const {getters, configuration} = cornerstoneTools.getModule('segmentation');
    cornerstoneTools.setToolActive('Brush', {mouseButtonMask: 1});
    newValue ? configuration.radius = newValue : configuration.radius = 20
  }

  return (
  <div>
  <AppBar className={classes.appbar}>
    <Toolbar>
      <AngleButton/>
      <BrushButton isShow={isShow} enableShow={enableShow} setSize={value}/>
      <ContrastButton/>
      <CircleButton/>
      <EraserButton/>
      <FreeHandButton/>
      <InverButton cornerstoneElementRef={cornerstoneElementRef}/>
      <LengthButton/>
      <MagnifyButton/>
      <PanButton/>
      <ProbeButton/>
      <RectangleButton/>
      <CorrectionScissorButton/>
      <UndoButton matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
      <ZoomInButton cornerstoneElementRef={cornerstoneElementRef}/>
      <ZoomOutButton cornerstoneElementRef={cornerstoneElementRef}/>
    </Toolbar>			
    
  </AppBar>
   {isShow ? <Slider
      className={classes.slider}				
      value={value}
      onChange={setSize}
      getAriaValueText={valueText}
      defaultValue={20}
      min={1}
      max={50}
      step={1}
  /> : null
  }
</div>
 
);
}

export default AnnotationUtilitiesAppBar;