import React, { useState, useCallback, DragEvent} from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import Dropzone, {useDropzone} from 'react-dropzone';
import { Button, Toolbar } from '@material-ui/core';import ZoomInIcon from '@material-ui/icons/ZoomIn';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import AdjustIcon from '@material-ui/icons/Adjust';
import GestureIcon from '@material-ui/icons/Gesture';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


import '../index.scss'
import clsx from 'clsx';
import { AddToPhotosTwoTone } from '@material-ui/icons';

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
		uploadBtn: {
			backgroundColor: 'white',
			padding: 10,
			marginLeft: 10,
			'&:hover': {
				backgroundColor: 'white',
			}
		},
    })
)

interface PropsDicomDropZone {
	imageId: string;
}

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

const FileUpload = () => {
	// const classes = useStyles()
	// const theme = useTheme()
	// console.log('CLICKKKKKKKKKKKED'); 
	// const file:File = event.files[0]
	// // const file = event.target.file[0];

	// const reader = new FileReader();
	// reader.onloadend = (e) => {
	// 	const selectedFile = reader.result
	// 	console.log(selectedFile)
	// }
	// // console.log(file)
	// let element: HTMLDivElement;
	// const onFileUpload = (e: DragEvent<HTMLDivElement>) => {
	// 	e.preventDefault();
	// }
	// const[file, setFile] = useState('');
	const [imageName, setImageName] = useState('')
	const [patientName, setPatiename] = useState('')
	return <DICOMDropZone setImageName={setImageName} 
						setPatientName={setPatiename}
			/> 
}

const LoadImage = (): JSX.Element => {

    const classes = useStyles()
	
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
			{/* <Button className={classes.uploadBtn}
			 	// onClick={(event) => FileUpload(event)}
				// setImageName={setImageName} 
				// setPatientName={setPatiename}
				onClick={() => <DICOMDropZone setImageName={setImageName} 
				setPatientName={setPatiename}
				/>}
				>
				<AddPhotoAlternateIcon/>
				Upload File Here
			</Button> */}
			{/* <input type="file" onClick={FileUpload(this)}/>
			 */}
        </div>
	);
}

export default LoadImage;