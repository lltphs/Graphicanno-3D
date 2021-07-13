import { Grid } from '@material-ui/core';
import { useEffect, useMemo, useRef, useState } from 'react';

import AnnotationUtilitiesAppBar from './AnnotationUtilitiesAppBar/AnnotationUtilitiesAppBar';
import setupCornerstone from './Cornerstone/setupCornerstone';
import useStyles from './Style/Style';
import createVirtualSlice from './VirtualSlice/ManipulateVirtualSlice/createVirtualSlice';
import moveVirtualSlice from './VirtualSlice/ManipulateVirtualSlice/moveVirtualSlice';
import createVolume3DMaterialAndVolume from './Volume3D/createVolume3DMaterialAndVolume';
import Volume3DWrapper from './Volume3D/Volume3DWrapper';

const Annotation = ({ nrrdUrl }) => {
  
  const matNVol = useMemo(() => createVolume3DMaterialAndVolume(nrrdUrl), [nrrdUrl]);

  const [isInMoveSliceMode, setIsInMoveSliceMode] = useState(false);
  
  const sliceRef = useRef();

  const cornerstoneElementRef = useRef(null);
  
  useEffect(() => setupCornerstone(cornerstoneElementRef), [cornerstoneElementRef]);

  useEffect(() => createVirtualSlice(sliceRef, matNVol, cornerstoneElementRef), [sliceRef, matNVol, cornerstoneElementRef]);
  
  useEffect(() => {
    const handleEventWrapper = (event) => handleEvent(event, isInMoveSliceMode, setIsInMoveSliceMode, sliceRef, matNVol, cornerstoneElementRef);
	  document.addEventListener('keydown', handleEventWrapper);
	  document.addEventListener('wheel', handleEventWrapper);
	  return () => {
      document.removeEventListener('keydown', handleEventWrapper);
      document.removeEventListener('wheel', handleEventWrapper);
    }
	});

  const classes = useStyles();

  return (
    <div className={classes.ele}>
      <AnnotationUtilitiesAppBar matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
      <Grid container spacing={3} style={{width:'100%', height:'100%'}}>
      <Grid item xs={6}>
        <Volume3DWrapper
          material={matNVol.mat}
          xLength={matNVol.vol.xLength}
          yLength={matNVol.vol.yLength}
          zLength={matNVol.vol.zLength}
          isInMoveSliceMode={isInMoveSliceMode}
        />
      </Grid>
      <Grid item xs={6}>
        <div className={classes.dicom}
          ref={(input) => {
            cornerstoneElementRef.current = input
        }}></div>
      </Grid>
      <Grid item xs={12}>
        <h1 style={{backgroundColor: isInMoveSliceMode ? 'red' : 'blue'}}>Hi</h1>
      </Grid>    
    </Grid>
    <canvas id='vs' hidden></canvas>
    </div>
  );
}

const handleEvent = (event, isInMoveSliceMode, setIsInMoveSliceMode, sliceRef, matNVol, cornerstoneElementRef) => {
  // If user type Ctrl + Space: call setInMoveSliceMode, i.e, flip inModeSliceMode
  if (event.ctrlKey && event.key == ' ') setIsInMoveSliceMode(!isInMoveSliceMode);

  // If isInMoveSliceMode: move slice accordingly
  if (checkEventValid(event, isInMoveSliceMode)) moveVirtualSlice(sliceRef, matNVol, event, cornerstoneElementRef);
}

function checkEventValid(event, isInMoveSliceMode) {  
  //Only move slice in Move-Slice Mode
  if (!isInMoveSliceMode) return false;

  //Key event only valid if user presses correct key
  if (event.key) {
    const key = event.key;
    if (key == 'ArrowUp' || 
        key == 'ArrowDown' ||
        key == 'ArrowLeft' ||
        key == 'ArrowRight' ||
        key == 'w' ||
        key == 's' ||
        key == 'a' || 
        key == 'd') return true;
  } 
  // Wheel event, if any, is valid
  if (event.delta != 0) return true;

  //Nothing else valid
  return false
}

export default Annotation;