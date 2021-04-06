import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import { render } from '@testing-library/react';

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.init();
// getCanvas = cornerstone.getCanvas;
// const config = {
//     touchEnabled: false,
//   };
//   const csTools = cornerstoneTools.init(config);

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
        decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false,
        },
    },
});

// const loadImageToCanvas = () => {
//     const canvasElement = this.canvas
//     canvasElement.enable(canvasElement)
//     cornerstone.loadImage(imageId).then(image){
//         cornerstone.displayImage(canvasElement, image)
//     }
// }
// const imageId = "./dicom/image_0.dcm";
const imageId =
  "https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg";



function LoadImage() {
    const element = document.getElementById('#element2');
    cornerstone.enable(element);
    cornerstone.loadImage(imageId).then(function(image){
        // Now that we've "loaded" the image, we can display it on
        // our Cornerstone enabled canvascanvasElement of choice
        cornerstone.displayImage(element, image);    
    })
   
	return ( 
		<div 
        style={{backgroundColor: 'white', visibility: 'visible',
                width: '100%', height: `calc(100% - 100px)`}}
        className="cornerstone-canvas"
        id="element1">
            
            <canvas id="element2"/>
            {/* <DicomViewer/> */}
        </div>       
	);
}

export default LoadImage;