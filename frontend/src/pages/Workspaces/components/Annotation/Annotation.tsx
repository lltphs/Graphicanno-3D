import { Container } from '@material-ui/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import NavigationBar from './NavigationBar/NavigationBar';
import AnnotationUtilitiesAppBar from './AnnotationUtilitiesAppBar/AnnotationUtilitiesAppBar';
import setupCornerstone from './Cornerstone/setupCornerstone';
import useStyles from './Style/Style';
import createVirtualSlice from './VirtualSlice/ManipulateVirtualSlice/createVirtualSlice';
import moveVirtualSlice from './VirtualSlice/ManipulateVirtualSlice/moveVirtualSlice';
import createVolume3DMaterialAndVolume from './Volume3D/createVolume3DMaterialAndVolume';
import Volume3D from './Volume3D/Volume3D';

const Annotation = ({ nrrdUrl }) => {
  const { datasetId } = useParams<{datasetId: string}>()
  const matNVol = useMemo(() => createVolume3DMaterialAndVolume(datasetId), [datasetId]);
  // const matNVol = useMemo(() => createVolume3DMaterialAndVolume(nrrdUrl), [nrrdUrl]);
  
  const sliceRef = useRef();

  const cornerstoneElementRef = useRef(null);
  
  useEffect(() => setupCornerstone(sliceRef, matNVol, cornerstoneElementRef), [sliceRef, matNVol, cornerstoneElementRef]);

  useEffect(() => createVirtualSlice(sliceRef, matNVol, cornerstoneElementRef), [sliceRef, matNVol, cornerstoneElementRef]);
  
  useEffect(() => {
    const handleEventWrapper = (event) => handleEvent(event, sliceRef, matNVol, cornerstoneElementRef);
	  document.addEventListener('keydown', handleEventWrapper);
	  document.addEventListener('wheel', handleEventWrapper);
	  return () => {
      document.removeEventListener('keydown', handleEventWrapper);
      document.removeEventListener('wheel', handleEventWrapper);
    }
	});

  const classes = useStyles();

  return (
    <Container  
      className={classes.container}
      style={{backgroundColor: 'black'}}>

      <NavigationBar sliceRef={sliceRef} matNVol={matNVol} cornerstoneElementRef={cornerstoneElementRef}/>
      
      <div className={classes.dicomWrapper} id="canvas">
        <div className={classes.ele}>
          <AnnotationUtilitiesAppBar matNVol={matNVol} sliceRef={sliceRef} cornerstoneElementRef={cornerstoneElementRef}/>
          <div className={classes.dicom} style={{display:"flex"}}>
            <div style={{width:"50%"}}>
              <Volume3D
                material={matNVol.mat}
                xLength={matNVol.vol.xLength}
                yLength={matNVol.vol.yLength}
                zLength={matNVol.vol.zLength}
              />
            </div>
            <div className={classes.dicom}
                ref={(input) => {
                  cornerstoneElementRef.current = input
            }}
            style={{width:"50%"}}>
            </div>
          </div>
        <canvas id='vs' hidden></canvas>
        </div>
      </div>
    </Container>
  );
}

const handleEvent = (event, sliceRef, matNVol, cornerstoneElementRef) => {
  // If isInMoveSliceMode: move slice accordingly
  if (checkEventValid(event)) moveVirtualSlice(sliceRef, matNVol, event, cornerstoneElementRef);
}

function checkEventValid(event) {
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
  if (event.delta != 0 && event.shiftKey) return true;

  //Nothing else valid
  return false
}

export default Annotation;