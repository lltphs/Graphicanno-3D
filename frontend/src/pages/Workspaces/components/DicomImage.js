import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoreMath from'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';

// cornerstoneTools.external.cornerstone = cornerstone;
// cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
// cornerstoneWebImageLoader.external.cornerstone = cornerstone;
// cornerstoneTools.external.Hammer = Hammer;

const imageId = "./dicom/image_0.dcm";

// const useStyles = makeStyles( theme => ({
// 	createStyles({
// 		canvas: {
//             // width: '100%',
//             // height: `calc(100vh - 116px)`,
//             // backroundColor: 'black',
//         },
// 	}),
// }));

function LoadImage() {

    // const classes = useStyles();

	return ( 
		<canvas 
        style={{backgroundColor: 'transparent', 
                width: '100%', 
                height: `calc(100% - 100px)`

            }}>
            <p style={{color: 'white'}}>HELOOOOOOOOOOOOOOOOOOOOOO</p>
        
        </canvas>
	);
}

export default LoadImage;