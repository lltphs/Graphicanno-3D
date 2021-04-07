import React, { useState, useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import {useDropzone} from 'react-dropzone';
import '../index.scss'

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser

const useStyles = makeStyles(() => 
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
		}
    })
)

const DICOMDropZone = ({setImageName, setPatientName}): JSX.Element => {

    const classes = useStyles();
	
	//This part is for dropzone
	const onDrop = useCallback( async (acceptedFiles: Array<File>) => {
		// console.log(acceptedFiles);
		const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(acceptedFiles[0]);
		const imageName = acceptedFiles[0].name		
		// const [imageName, setImageName] = useState(name)
		setImageName(imageName)
		cornerstone.loadImage(imageId).then((image) => {
			cornerstone.displayImage(element, image);
			const patientName = image.data.string('x00100010')
			setPatientName(patientName)
			// console.log(PatientName)
		})
	}, []);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

	let element: HTMLDivElement;
	


	return (
	<div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
		<input {...getInputProps()}/>
		{
			isDragActive ?
			<p className={classes.drop} >Drop here </p> :
			<p className={classes.drag}>DRAG FILE HERE </p>
		}

		{/* { setImageName = acceptedFiles[0].name	} */}

		<div id="dicom" style={{width: "100%", height: "100%"}} ref={input=>{
				if (input !== null) {
					element=input; 
					cornerstone.enable(element);
				}
			}}></div>
	</div>
	)
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
			
        </div>
	);
}

export default LoadImage;