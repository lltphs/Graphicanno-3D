import React, { useState, useCallback } from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import {useDropzone} from 'react-dropzone';
import { Button, Toolbar } from '@material-ui/core';import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import AdjustIcon from '@material-ui/icons/Adjust';
import GestureIcon from '@material-ui/icons/Gesture';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


import '../index.scss'
import clsx from 'clsx';

// cornerstoneTools.init({
// 	globalToolSyncEnabled: true,
// })

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser

cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneTools.external.Hammer = Hammer
// cornerstoneTools.init()
// const mouseTool = cornerstoneTools.MouseInput


const useStyles = makeStyles((theme) => 
    createStyles({
        dicomDrop: {
            height: '100%',
            margin: 'auto',
        },
        drop: {
            color: 'white',
        },
		drag: {
			width: 'fit-content',
			border: '1px solid white',
			color: 'white',
			padding: 10,
			marginLeft: 10,
		}, 
    })
)

const DICOMDropZone = ({setImageName, setPatientName}) => {

    const classes = useStyles();
	const theme = useTheme();
	
	let element: HTMLDivElement;

	//This part is for dropzone
	const onDrop = useCallback( async (acceptedFiles: Array<File>) => {
		// console.log(acceptedFiles);
		const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(acceptedFiles[0]);
		const imageName = acceptedFiles[0].name				
		setImageName(imageName)
		cornerstone.loadImage(imageId).then((image) => {
			cornerstone.displayImage(element, image);
			const patientName = image.data.string('x00100010');
			setPatientName(patientName);
			console.log(image);
			// const dicomElement = element
			
		}) 
		
	}, []);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
	
	return (
	<div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
		<input {...getInputProps()}/>
		{
			isDragActive ?
			<p className={classes.drop} >Drop here </p> :
			<p className={classes.drag}>DRAG FILE HERE </p>
		}

		{/* { setImageName = acceptedFiles[0].name	} */}

		<div id="dicom" style={{width: "100%", height: "100%"}} 
			ref={input=>{
				if (input !== null) {
					element=input; 
					console.log(element)
					cornerstone.enable(element);
					// cornerstoneTools.StackScrollMouseWheelTool
					cornerstoneTools.mouseInput.enable(element);
					cornerstoneTools.mouseWheelInput.enable(element);
					// // // Enable all tools we want to use with this element
					cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
					cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
					cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
					cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
					// cornerstoneTools.probe.enable(element);
					// cornerstoneTools.length.enable(element);
					// cornerstoneTools.ellipticalRoi.enable(element);
					// cornerstoneTools.rectangleRoi.enable(element);
					// cornerstoneTools.angle.enable(element);
					// cornerstoneTools.highlight.enable(element);
				}
			}}>
				
			</div>
	</div>
	)
}

// const FileUpload = () => {
// 	const[file, setFile] = useState('');
	
// 	const handleUpload = () =>{
// 		setFile
// 	}
// }

const enableTools = (element) => {
	return 
		// cornerstoneTools.StackScrollMouseWheelTool;
		cornerstoneTools.mouseInput.enable(element);
		cornerstoneTools.mouseWheelInput.enable(element);
		// // Enable all tools we want to use with this element
		cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
		cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
		cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
		cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
		cornerstoneTools.probe.enable(element);
		cornerstoneTools.length.enable(element);
		cornerstoneTools.ellipticalRoi.enable(element);
		cornerstoneTools.rectangleRoi.enable(element);
		cornerstoneTools.angle.enable(element);
		cornerstoneTools.highlight.enable(element);
	

}

const LoadImage = (): JSX.Element => {

    const classes = useStyles();

	const [imageName, setImageName] = useState('')
	const [patientName, setPatiename] = useState('')
	// console.log('AAAAAAAAAAAAAA' + imageName)
	return ( 
		
		<div className={classes.dicomDrop}>
			
			<p style={{color: 'white'}}>
				{imageName} &emsp; {patientName}
			</p>
			
            <DICOMDropZone setImageName={setImageName} 
						setPatientName={setPatiename}
						/>
			{/* {DICOMDropZone(setImageName={setImageName} 
			setPatientName={setPatiename})} */}
			
        </div>
	);
}

export default LoadImage;