import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import Scene from '../scene';
import createSlice from './VirtualSlice/ManipulateVirtualSlice/createVirtualSlice';
import moveSlice from './VirtualSlice/ManipulateVirtualSlice/moveVirtualSlice';
import createVolume3DMaterialAndVolume from './Volume3D/createVolume3DMaterialAndVolume';
import Volume3DWrapper from './Volume3D/Volume3DWrapper';
import { BoxGeometry } from 'three';
import { Dicom } from '../Labeling';

const Annotation = ({ nrrdUrl }) => {
  
  const matNVol = useMemo(() => createVolume3DMaterialAndVolume(nrrdUrl), [nrrdUrl]);

  const [isInMoveSliceMode, setIsInMoveSliceMode] = useState(false);

  const sliceRef = useRef();
  console.log(matNVol.mat);
  console.log(matNVol.vol);
  return (
    <div style={{width:'100%', height:'100%'}}>
      <Dicom material={matNVol.mat}/>
    </div>
  );
}

      // {/* <Dicom material={matNVol.mat} NRRD={matNVol.vol}/> */}
  
  // useEffect(() => createSlice(sliceRef, matNVol));
  
  // useEffect(() => {
  //   const handleEventWrapper = (event) => handleEvent(event, isInMoveSliceMode, setIsInMoveSliceMode, sliceRef, matNVol);
	//   document.addEventListener('keydown', handleEventWrapper);
	//   document.addEventListener('scroll', handleEventWrapper);
	//   return () => {
  //     document.removeEventListener('keydown', handleEventWrapper);
  //     document.removeEventListener('scroll', handleEventWrapper);
  //   }
	// });
  // const h = 512;
  // const aspect = window.innerWidth / window.innerHeight;
  // const geometry = new BoxGeometry(matNVol.vol.xLength, matNVol.vol.yLength, matNVol.vol.zLength)
	// geometry.translate(
	//   matNVol.vol.xLength / 2 - 0.5,
	//   matNVol.vol.yLength / 2 - 0.5,
	//   matNVol.vol.zLength / 2 - 0.5
	// );
      // {/* <Volume3DWrapper
      //   material={matNVol.mat}
      //   xLength={matNVol.vol.xLength}
      //   yLength={matNVol.vol.yLength}
      //   zLength={matNVol.vol.zLength}
      // /> */}

      // {/* <canvas id='vs'></canvas>
      // <Canvas
			// 	className='canvas'
			// 	orthographic={true}
			// 	camera={{
			// 		left: (-h * aspect) / 2,
			// 		right: (h * aspect) / 2,
			// 		top: h / 2,
			// 		bottom: -h / 2,
			// 		near: 1,
			// 		far: 1000,
			// 		position: [0, 0, 500],
			// 		up: [0, 0, 1],
			// 	}}
			// 	>
			// 	<Scene geometry={geometry} material={matNVol.mat} NRRD={matNVol.vol}/>
			// </Canvas> */}
const handleEvent = (event, isInMoveSliceMode, setIsInMoveSliceMode, sliceRef, matNVol) => {
  //If user type Ctrl + Space: call setInMoveSliceMode, i.e, flip inModeSliceMode
  // if (event.altKey && event.key == ' ') setIsInMoveSliceMode();

  //If isInMoveSliceMode: move slice accordingly
  // if (checkEventValid(event, isInMoveSliceMode)) moveSlice(sliceRef, matNVol, event);
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
  if (event.delta) return true;

  //Nothing else valid
  return false
}

export default Annotation;