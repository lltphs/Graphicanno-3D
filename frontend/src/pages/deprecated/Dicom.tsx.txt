import React, { useState, useEffect, Suspense, useRef, useMemo, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  AppBar,
  Toolbar,
  Grid
} from '@material-ui/core';
import { 
	mdiCheckboxIntermediate,
	mdiRuler,
	mdiAngleAcute,
	mdiEllipse,
	mdiRectangle,
	mdiCursorPointer,
	mdiEraser, 
	mdiBrush,
	mdiScissorsCutting,
	mdiUndo,
	mdiRedo
} from '@mdi/js'
import { Icon } from '@mdi/react'

// import authenticate from django.contrib.auth ;
import Alert from 'components/common/Alert';
import PasswordInput from 'components/common/TextField/PasswordInput';
import ColoredLinearProgress from 'components/common/Progress/ColoredLinearProgress';
import { register } from 'store/actions/auth';
import { RootDispatchType } from 'store';
import 'pages/Home/index.scss';
import { boolean } from 'yup/lib/locale';
// import LoginForm from './UserLoginForm';
import NavigationBar from './NavBarBtn';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AdjustIcon from '@material-ui/icons/Adjust';
import GestureIcon from '@material-ui/icons/Gesture';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from'cornerstone-math';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import { ContactSupportOutlined, SettingsInputAntennaTwoTone } from '@material-ui/icons';
import { TrackballControls } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import Scene from './scene';
import { GRAY_WITH_ANNOTATION_TEXTURE_URL } from './constants';
import { onKeyPressed, showSlice } from './utils';
import slice from './utils/virtualSlice';
import _ from 'lodash';
import Annotation from './Annotation/Annotation';
import useStyles from './Annotation/Style/Style';
const {
  TextureLoader,
  DataTexture3D,
  RedFormat,
  FloatType,
  LinearFilter,
  UniformsUtils,
  BackSide,
  ShaderMaterial,
  BoxGeometry,
} = require('three')
const { NRRDLoader } = require('three/examples/jsm/loaders/NRRDLoader')
const {
  VolumeRenderShader1,
} = require('three/examples/jsm/shaders/VolumeShader')

const Dicom = ({ material }): JSX.Element => {
	const NRRD = useLoader(NRRDLoader, 'http://localhost/api/get-nrrd-volume/admin/liver_01^patient/undefined/')
	const grayWithAnnotationTexture = useLoader(TextureLoader, GRAY_WITH_ANNOTATION_TEXTURE_URL)
  
	// build data texture 3D
	// const data3D = new DataTexture3D(
	//   NRRD.data,
	//   NRRD.xLength,
	//   NRRD.yLength,
	//   NRRD.zLength
	// )
	// console.log('re-computed');
	// data3D.format = RedFormat
	// data3D.type = FloatType
	// data3D.minFilter = data3D.magFilter = LinearFilter
	// data3D.unpackAlignment = 1
  	const trackballControlsRef = useRef(null)
	const data3D = useMemo(() => {
	  const tempObj = new DataTexture3D(
		NRRD.data.slice(0),
		NRRD.xLength,
		NRRD.yLength,
		NRRD.zLength
	  )
	  tempObj.format = RedFormat
	  tempObj.type = FloatType
	  tempObj.minFilter = tempObj.magFilter = LinearFilter
	  tempObj.unpackAlignment = 1
	  return tempObj
	}, [NRRD])
  
	const uniforms = useMemo(() => {
	  const tempObj = UniformsUtils.clone(VolumeRenderShader1.uniforms)
	  tempObj['u_data'].value = data3D
	  tempObj['u_size'].value.set(NRRD.xLength, NRRD.yLength, NRRD.zLength)
	  tempObj['u_clim'].value.set(0, 1)
	  tempObj['u_renderstyle'].value = 0
	  tempObj['u_renderthreshold'].value = 0.15
	  tempObj['u_cmdata'].value = grayWithAnnotationTexture
	  return tempObj
	}, [data3D, NRRD])
  
	// const material = useMemo(() => {
	//   return new ShaderMaterial({
	// 	uniforms: uniforms,
	// 	vertexShader: VolumeRenderShader1.vertexShader,
	// 	fragmentShader: VolumeRenderShader1.fragmentShader,
	// 	side: BackSide,
	//   })
	// }, [uniforms])
  
	const geometry = new BoxGeometry(NRRD.xLength, NRRD.yLength, NRRD.zLength)
	geometry.translate(
	  NRRD.xLength / 2 - 0.5,
	  NRRD.yLength / 2 - 0.5,
	  NRRD.zLength / 2 - 0.5
	)
  
	const sliceInfo = useMemo(
	  () => ({
		volume: NRRD,
		material: material,
	  }),
	  [material, NRRD]
	)
  
	const [a, setA] = useState(0)
  
	console.log({ ao: a })
	useEffect(() => {
	  showSlice(sliceInfo)
	}, [])
  
	useEffect(() => {
	  const onKeyDown = (e) => {
		console.log('keydown')
		console.log({ a })
		setA(a + 1)
		onKeyPressed({ sliceInfo, e })
	  }
  
	  document.addEventListener('keydown', onKeyDown)
	  return () => document.removeEventListener('keydown', onKeyDown)
	}, [a])
	const classes = useStyles()
	const id: any = useParams();
	const element: any = useRef();

	const [initViewport, setInitViewport] = useState('')
	
	const readImage = async () => {
		const image = await cornerstone.loadImage(`http://localhost/api/get-png-slice/admin/liver_01^patient/undefined/0/`)
		cornerstone.enable(element.current)

		// add stack
		const stack = {
			imageIds: [id],
			currentImageIdIndex: 0
		};		
		cornerstoneTools.clearToolState(element.current, "stack");
		cornerstoneTools.addStackStateManager(element.current, ["stack"]);
		cornerstoneTools.addToolState(element.current, "stack", stack);
		
		//display image
		cornerstone.displayImage(element.current, image)
		// for (let i = 1; i < 100;i++) {
		// 	const image = await cornerstone.loadImage(`http://localhost/api/get-png-slice/admin/liver_01^patient/undefined/${i}/`)
		// 	cornerstone.displayImage(element.current, image)
		// }
		// Add all needed tools version 4.18.1
		cornerstoneTools.addTool(cornerstoneTools.ZoomTool)
		cornerstoneTools.addTool(cornerstoneTools.WwwcTool)
		cornerstoneTools.addTool(cornerstoneTools.MagnifyTool)
		cornerstoneTools.addTool(cornerstoneTools.AngleTool)   
		cornerstoneTools.addTool(cornerstoneTools.LengthTool)
		cornerstoneTools.addTool(cornerstoneTools.PanTool)
		cornerstoneTools.addTool(cornerstoneTools.ProbeTool)
		cornerstoneTools.addTool(cornerstoneTools.EllipticalRoiTool)
		cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool)
		cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool)
		cornerstoneTools.addTool(cornerstoneTools.EraserTool)
		cornerstoneTools.addTool(cornerstoneTools.BrushTool)
		cornerstoneTools.addTool(cornerstoneTools.CorrectionScissorsTool)
		
		//get the viewport
		let viewport = cornerstone.getViewport(element.current)		
		setInitViewport(viewport)

	}

	// const [toolname, setToolname] = useState('')

	const disableAllTools = () => {
		cornerstoneTools.wwwc.deactivate(element.current, 1); // ww/wc is the default tool for left mouse button
		cornerstoneTools.pan.deactivate(element.current, 2); // pan is the default tool for middle mouse button
		cornerstoneTools.zoom.deactivate(element.current, 4); // zoom is the default tool for right mouse button
		cornerstoneTools.zoomWheel.deactivate(element.current); // zoom is the default tool for middle mouse wheel
		cornerstoneTools.freeahandroi.deactive(element.current);
		// cornerstoneTools.probe.disable(element.current);
		// cornerstoneTools.length.disable(element.current);
		cornerstoneTools.ellipticalRoi.disable(element.current);
		cornerstoneTools.rectangleRoi.disable(element.current);
		cornerstoneTools.angle.disable(element.current);
		cornerstoneTools.highlight.disable(element.current);
		cornerstoneTools.magnify.disable(element.current);
	}

	const handleZoomIn = (): any => {
		cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1})
		let currentViewport = cornerstone.getViewport(element.current)
		currentViewport.scale += 0.1
		cornerstone.setViewport(element.current, currentViewport)
	}

	const handleZoomOut = () => {
		cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1})
		let currentViewport = cornerstone.getViewport(element.current)
		currentViewport.scale -= 0.1
		cornerstone.setViewport(element.current, currentViewport)
	}

	const handleMagnify = () => {		
		cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 })	
	}

	const handlePan = () => {
		cornerstoneTools.setToolActive('Pan', {mouseButtonMask: 1})
	}
	
	const handleContrast = () => {
		cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 1})
	} 

	const handleProbe = () => {
		cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 })         
	}

	const handleAngle = () => {
		cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })
	}

	const handleLength = () => {
		cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 })
	}

	const handleEllipse = () => {
		cornerstoneTools.setToolActive('EllipticalRoi', {mouseButtonMask: 1})
	}

	const handleRectangle = () => {
		cornerstoneTools.setToolActive('RectangleRoi', {mouseButtonMask: 1})
	}

	const handleFreeHand = () => {
		cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 })
		console.log('region: ', cornerstoneTools.freehandArea)
	}

	const handleEraser = () => {
		cornerstoneTools.setToolActive('Eraser', {mouseButtonMask: 1})
	}

	const handleBrush = () => {
		const {
			getters,
			setters,
			configuration,
			state
		} = cornerstoneTools.getModule('segmentation')
		
		//pixelData2D
		cornerstoneTools.setToolActive('Brush', {mouseButtonMask: 1})
		const labelmap2D = getters.labelmap2D(element.current)
		console.log('labelmap2d: ', labelmap2D)
		setters.activeSegmentIndex(element.current, 999)
		
		const arrayPixel = labelmap2D.labelmap2D.pixelData
		console.log('arrayPixel: ', arrayPixel.length)
				
		console.log('config: ', configuration)
		// configuration.renderFill = false

		
		let count = 0
		let border : number[] = []
		const imageSize = Math.ceil(
			2 * Math.sqrt(
			  NRRD.xLength * NRRD.xLength +
				NRRD.yLength * NRRD.yLength +
				NRRD.zLength * NRRD.zLength
			)
		  );
		for (let j = 0; j < imageSize * imageSize; j++){
			if (arrayPixel[j] === 999){
				count += 1
				border.push(j)
			}
		}
		
		console.log('Total num equal 1000: ', count)
		console.log('border: ', border)
		console.log('getters', getters)
		console.log('setters:', setters)
		// console.log('state', state)

		const canvas : any = document.getElementsByClassName('cornerstone-canvas')[0]
        const ctx = canvas.getContext('2d');
		let coordsOfBorder = []
		let i
		console.log('Oh yeah')
		for (i = 0; i < border.length; i++){
			let xv = border[i] % imageSize
			let yv = Math.floor(border[i] / imageSize)
			let new_vector = slice.origin.add(slice.u.scalarMultiple(xv-slice!.vOrigin.x)).add(slice.v.scalarMultiple(yv-slice!.vOrigin.y));
			let x = Math.round(new_vector.x);
			let y = Math.round(new_vector.y);
			let z = Math.round(new_vector.z);
			if (x >= 0 && x < NRRD.xLength && y >= 0 && y < NRRD.yLength && z >= 0 && z < NRRD.zLength) {
				material.uniforms['u_data'].value.image.data[
					x + y * NRRD.xLength + z * NRRD.xLength * NRRD.yLength
				] = 1;
				console.log(material.uniforms['u_data'].value.image.data[
					x + y * NRRD.xLength + z * NRRD.xLength * NRRD.yLength
				]);
			} else {
				console.log(x,y,z);
			}
			//calculate the pixelIndex, then set it to 1000
			// var pIndex = x + imageSize * y
			// arrayPixel[pIndex + 100] = 999
		}
		material.uniforms['u_data'].value.needsUpdate = true
		

		
		
		// let pixelData = new Uint8ClampedArray(3);
		// for (let i = 128; i < 256; i++) {
		// 	for (let j = 256; j < 384; j++) {
		// 		pixelData[i*255 + j] = 1;
		// 	}
		// }
		// let toolState = cornerstoneTools.getToolState(element.current, 'brush');
		// if (toolState) {
		// 	toolState.data[0].pixelData = [...pixelData];
		// } else {
		// 	cornerstoneTools.addToolState(element.current, 'brush', { pixelData });
		// 	toolState = cornerstoneTools.getToolState(element.current, 'brush');
		// }
		// toolState.data[0].invalidated = true;
		// cornerstone.updateImage(element.current);
	}
	const handleCorrectionScissor = () => {
		cornerstoneTools.setToolActive('CorrectionScissors', {mouseButtonMask: 1})
	}

	const handleInvert = () => {
		let viewport = cornerstone.getViewport(element.current)
		viewport.invert = !viewport.invert
		cornerstone.setViewport(element.current, viewport)
	}

	const handleUndo = () => {
		const { setters } = cornerstoneTools.getModule('segmentation')
		console.log('setters: ', setters)
		setters.undo(element.current) // 2 is default labelmapIndex
	}

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	
	const open = Boolean(anchorEl);

	const handleReset = () => {
		let currentViewport = cornerstone.getViewport(element.current)
		currentViewport.voi.windowWidth = 0
     	currentViewport.voi.windowCenter = 0
		cornerstone.setViewport(element.current, initViewport)
		cornerstoneTools.setToolPassive()
	}

	const handleHideAll = () => {
		cornerstoneTools.setToolPassive('Magnify', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('Pan', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('Contrast', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('Probe', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('Angle', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('Length', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('EllipticalRoi', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('RectangleRoi', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('FreeHandRoi', { mouseButtonMask: 1 })
		cornerstoneTools.setToolPassive('Brush', { mouseButtonMask: 1 })
		
		let currentViewport = cornerstone.getViewport(element.current)
		currentViewport.voi.windowWidth = 0
     	currentViewport.voi.windowCenter = 0
		cornerstone.setViewport(element.current, initViewport)
		cornerstoneTools.setToolPassive()
	}

	const handleManage = () => {
		// measure = cornerstone.setToolActive('Measurement')
		console.log('measure')
		// const data = cornerstoneTools.getActiveColor(element.current, 'freehandroi');
		// console.log('data', data)

		let toolState = cornerstoneTools.getToolState(element.current, 'freehandRoi');
		console.log('toolstate', toolState)
		// if (toolState) {
		// 	toolState.data[0].pixelData = [...pixelData];
		// } else {
		// 	cornerstoneTools.addToolState(element.current, 'brush', { pixelData });
		// 	toolState = cornerstoneTools.getToolState(element.current, 'brush');
		// }
		// toolState.data[0].invalidated = true;
		// cornerstone.updateImage(element.current);
	}
	
	const h = 512
	const aspect = window.innerWidth / window.innerHeight
	return(
		
		<div className={classes.ele}>
			<AppBar className={classes.appbar}>
				<Toolbar>
					<Button className="item-btn"
					onClick={handleZoomIn}
					>
						<ZoomInIcon id="zoom-in" className="item-icon"/>
						<br/>
						Zoom In
					</Button>
					<Button className="item-btn"
						onClick = {handleZoomOut}
					>
						<ZoomOutIcon id="zoom-in" className="item-icon"/>
						<br/>
						Zoom Out
					</Button>
					<Button className="item-btn"
					 	onClick={handleMagnify}
					>
						<Icon path={mdiCheckboxIntermediate} id="zoom-in" className="item-icon"/>
						<br/>
						Magnify
					</Button>
					<Button className="item-btn"
					 	onClick={handlePan}
					>
						<Icon path={mdiCursorPointer} id="zoom-in" className="item-icon"/>
						<br/>
						Pan
					</Button>
					<Button className="item-btn"
						onClick={handleContrast}>
						<WbSunnyIcon id="zoom-in" className="item-icon"/>
						<br/>
						Contrast
					</Button>
					<Button className="item-btn"
					onClick={handleProbe}
					>
						<LocationDisabledIcon id="zoom-in" className="item-icon"/>
						<br/>
						Probe
					</Button>
					<Button className="item-btn"
						onClick={handleAngle}
					>
						<Icon path={mdiAngleAcute} id="zoom-in" className="item-icon"/>
						<br/>
						Angle
					</Button>
					<Button className="item-btn"
					 	onClick={handleLength}
					>
						<Icon path={mdiRuler} id="zoom-in" className="item-icon"/>
						<br/>
						Length
					</Button>				
					<Button className="item-btn"
					 	onClick={handleEllipse}
					>
						<Icon path={mdiEllipse} id="zoom-in" className="item-icon"/>
						<br/>
						Ellipse
					</Button>
					<Button className="item-btn"
					 	onClick={handleRectangle}
					>
						<Icon path={mdiRectangle} id="zoom-in" className="item-icon"/>
						<br/>
						Rectangle
					</Button>
					<Button className="item-btn"
						onClick={handleFreeHand}
					>
						<GestureIcon id="zoom-in" className="item-icon"/>
						<br/>
						FreeHand
					</Button>	
					<Button className="item-btn"
					 	onClick={handleEraser}
					>
						<Icon path={mdiEraser} id="zoom-in" className="item-icon"/>
						<br/>
						Eraser
					</Button>
					<Button className="item-btn"
					 	onClick={handleBrush}
					>
						<Icon path={mdiBrush} id="zoom-in" className="item-icon"/>
						<br/>
						Brush
					</Button>
					<Button className="item-btn"
					 	onClick={handleCorrectionScissor}
					>
						<Icon path={mdiScissorsCutting} id="zoom-in" className="item-icon"/>
						<br/>
						Scissor
					</Button>
					<Button className="item-btn"
						onClick={handleInvert}>
						<Brightness5Icon id="zoom-in" className="item-icon"/>
						<br/>
						Invert
					</Button>
					<Button className="item-btn"
						onClick={handleUndo}
						onMouseEnter={handlePopoverOpen}
        				onMouseLeave={handlePopoverClose}>
						<HistoryIcon path={mdiUndo} className="item-icon"/>
						<br/>
						Undo
						<Popover
							id="mouse-over-popover"
							className={classes.popover}
							classes={{
							paper: classes.papers,
							}}
							open={open}
							anchorEl={anchorEl}
							anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
							}}
							transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
							}}
							onClose={handlePopoverClose}
							disableRestoreFocus
						>
							<Typography>Only use for Brush Tool</Typography>
						</Popover>
					</Button>
					<Button className="item-btn"
						onClick={handleHideAll}
					>
						<VisibilityOffIcon id="zoom-in" className="item-icon"/>
						<br/>
						Hide all
					</Button>
					<Button className="item-btn"
						onClick={handleManage}
					>
						<ListAltIcon id="zoom-in" className="item-icon"/>
						<br/>
						Manage
					</Button>
				</Toolbar>			
			</AppBar>
			{/* <div className={classes.dicom}
				ref={(input) => {
					element.current = input
			}}></div> */}
			<canvas className='canvas' id='vs'></canvas>
			<Canvas
				className='canvas'
				orthographic={true}
				camera={{
					left: (-h * aspect) / 2,
					right: (h * aspect) / 2,
					top: h / 2,
					bottom: -h / 2,
					near: 1,
					far: 1000,
					position: [0, 0, 500],
					up: [0, 0, 1],
				}}
				>
				<Scene geometry={geometry} material={material} NRRD={NRRD}/>
			</Canvas>
			
		</div>		
	)
}

export default Dicom;