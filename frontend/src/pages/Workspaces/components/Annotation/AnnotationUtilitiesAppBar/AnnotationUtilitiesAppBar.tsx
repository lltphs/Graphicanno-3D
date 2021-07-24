import { AppBar, Toolbar } from '@material-ui/core';

import useStyles from '../Style/Style';
import { Divider } from '@material-ui/core';

import AngleButton from './Items/AngleButton';
import BrushButton from './Items/BrushButton';
import CircleButton from './Items/CircleButton';
import EraserButton from './Items/EraserButton';
import FreeHandButton from './Items/FreeHandButton';
import LengthButton from './Items/LengthButton';
import PanButton from './Items/PanButton';
import ProbeButton from './Items/ProbeButton';
import RectangleButton from './Items/RectangleButton';
import CorrectionScissorButton from './Items/CorrectionScissorButton';
import UndoButton from './Items/UndoButton';
import ZoomInButton from './Items/ZoomInButton';
import ZoomOutButton from './Items/ZoomOutButton';
import WindowingSlider from './Items/WindowingSlider';
import SaveYourWorkButton from '../NavigationBar/Items/SaveYourWorkButton';
import LoadPreviousWorkButton from '../NavigationBar/Items/LoadPreviousWorkButton';

const AnnotationUtilitiesAppBar = ({ matNVol, sliceRef, cornerstoneElementRef }) => {
  const classes = useStyles();

  return (
  <div>
    <AppBar className={classes.appbar}>
      <Toolbar>
        <AngleButton/>
        <FreeHandButton/>
        <LengthButton/>
        <ProbeButton/>
        <EraserButton/>
        <Divider orientation='vertical' flexItem={true} variant='middle'/>
        <BrushButton/>
        <CircleButton/>
        <RectangleButton/>
        <CorrectionScissorButton/>
        <UndoButton matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
        <Divider orientation='vertical' flexItem={true} variant='middle'/>
        <PanButton/>
        <ZoomInButton cornerstoneElementRef={cornerstoneElementRef}/>
        <ZoomOutButton cornerstoneElementRef={cornerstoneElementRef}/>
        <Divider orientation='vertical' flexItem={true} variant='middle'/>
        <WindowingSlider matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
        <Divider orientation='vertical' flexItem={true} variant='middle'/>
        <SaveYourWorkButton matNVol={matNVol}/>
        <LoadPreviousWorkButton sliceRef={sliceRef} matNVol={matNVol} cornerstoneElementRef={cornerstoneElementRef}/>
      </Toolbar>			
    </AppBar>
  </div>
);
}

export default AnnotationUtilitiesAppBar;