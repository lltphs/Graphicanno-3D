import { AppBar, Toolbar } from '@material-ui/core';

import useStyles from '../Style/Style';

import AngleButton from './Items/AngleButton';
import BrushButton from './Items/BrushButton';
import CircleButton from './Items/CircleButton';
import EraserButton from './Items/EraserButton';
import FreeHandButton from './Items/FreeHandButton';
import InverButton from './Items/InvertButton';
import LengthButton from './Items/LengthButton';
import MagnifyButton from './Items/MagnifyButton';
import PanButton from './Items/PanButton';
import ProbeButton from './Items/ProbeButton';
import RectangleButton from './Items/RectangleButton';
import SwitchStyleButton from './Items/SwitchStyleButton';
import CorrectionScissorButton from './Items/CorrectionScissorButton';
import UndoButton from './Items/UndoButton';
import ZoomInButton from './Items/ZoomInButton';
import ZoomOutButton from './Items/ZoomOutButton';
import WindowingSlider from './Items/WindowingSlider';

const AnnotationUtilitiesAppBar = ({ matNVol, sliceRef, cornerstoneElementRef }) => {
  const classes = useStyles();

  return (
  <div>
    <AppBar className={classes.appbar}>
      <Toolbar>
        <AngleButton/>
        <BrushButton/>
        <CircleButton/>
        <EraserButton/>
        <FreeHandButton/>
        <InverButton cornerstoneElementRef={cornerstoneElementRef}/>
        <LengthButton/>
        <MagnifyButton/>
        <PanButton/>
        <ProbeButton/>
        <RectangleButton/>
        <SwitchStyleButton matNVol={matNVol}/>
        <CorrectionScissorButton/>
        <UndoButton matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
        <ZoomInButton cornerstoneElementRef={cornerstoneElementRef}/>
        <ZoomOutButton cornerstoneElementRef={cornerstoneElementRef}/>
        <WindowingSlider matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
      </Toolbar>			
    </AppBar>
  </div>
);
}

export default AnnotationUtilitiesAppBar;