import { AppBar, Toolbar } from '@material-ui/core';

import useStyles from '../Style/Style';

import AngleButton from './Items/AngleButton';
import BrushButton from './Items/BrushButton';
import ContrastButton from './Items/ContrastButton';
import EllipseButton from './Items/EllipseButton';
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

const AnnotationUtilitiesAppBar = ({ matNVol, sliceRef, cornerstoneElementRef }) => {
  const classes = useStyles();
  return (
  <AppBar className={classes.appbar}>
    <Toolbar>
      <AngleButton/>
      <BrushButton matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
      <ContrastButton/>
      <EllipseButton/>
      <EraserButton/>
      <FreeHandButton/>
      <InverButton cornerstoneElementRef={cornerstoneElementRef}/>
      <LengthButton/>
      <MagnifyButton/>
      <PanButton/>
      <ProbeButton/>
      <RectangleButton/>
      <CorrectionScissorButton/>
      <UndoButton cornerstoneElementRef={cornerstoneElementRef}/>
      <ZoomInButton cornerstoneElementRef={cornerstoneElementRef}/>
      <ZoomOutButton cornerstoneElementRef={cornerstoneElementRef}/>
    </Toolbar>			
  </AppBar>
);
}

export default AnnotationUtilitiesAppBar;