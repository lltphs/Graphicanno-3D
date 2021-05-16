import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect, Route, useParams } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
import { object, string } from 'yup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  AppBar,
  Toolbar
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
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
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
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import { ContactSupportOutlined } from '@material-ui/icons';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone
cornerstoneWADOImageLoader.external.dicomParser = dicomParser
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneTools.external.Hammer = Hammer
cornerstoneTools.init(
	{
		// showSVGCursors: true,
	}
)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      padding: 0
    },
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(0),
	//   marginTop: 0,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textfiled: {
      color: 'black',
    },
	dicomWrapper: {
		width: '100%',
		height: `calc(100% - 260px)`,
	},
    dicom: {
      width: '100%',
      height: '100%',
      marginTop: 164,
      marginLeft: 72,
      margin: 'auto',
    },
	ele: {
		width: '100%',
		height: '100%',
	},
	appbar: {
		display: 'flex',
		paddingLeft: 72,
		paddingBottom: 10,
		marginTop: 64,
		backgroundColor: 'white',
	},
	popover: {
		pointerEvents: 'none',
	},
	papers: {
		padding: theme.spacing(1),
	},
  })
);

const Dicom = (): JSX.Element => {
	const classes = useStyles()
	const id: any = useParams();
	let element: any

	// const [img, setImg] = useState([])
	const [initViewport, setInitViewport] = useState('')
	// const [wwwc, setWwwc] = useState('')
	
	const readImage = async () => {
		const image = await cornerstone.loadImage(id.imageId)
		// console.log(typeof(image))
		cornerstone.enable(element)

		const stack = {
			imageIds: [id],
			currentImageIdIndex: 0
		};
		// add stack
		cornerstoneTools.clearToolState(element, "stack");
		cornerstoneTools.addStackStateManager(element, ["stack"]);
		cornerstoneTools.addToolState(element, "stack", stack);
		
		//display image
		cornerstone.displayImage(element, image)
		const patientName = image.data.string('x00100010')
		
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
		
		// cornerstoneTools.highlight.enable(element);

		//get the viewport
		let viewport = cornerstone.getViewport(element)		
		setInitViewport(viewport)

	}

	const [toolname, setToolname] = useState('')

	const disableAllTools = () => {
		cornerstoneTools.wwwc.deactivate(element, 1); // ww/wc is the default tool for left mouse button
		cornerstoneTools.pan.deactivate(element, 2); // pan is the default tool for middle mouse button
		cornerstoneTools.zoom.deactivate(element, 4); // zoom is the default tool for right mouse button
		cornerstoneTools.zoomWheel.deactivate(element); // zoom is the default tool for middle mouse wheel
		cornerstoneTools.freeahandroi.deactive(element);
		// cornerstoneTools.probe.disable(element);
		// cornerstoneTools.length.disable(element);
		cornerstoneTools.ellipticalRoi.disable(element);
		cornerstoneTools.rectangleRoi.disable(element);
		cornerstoneTools.angle.disable(element);
		cornerstoneTools.highlight.disable(element);
		cornerstoneTools.magnify.disable(element);
	}

	const handleZoomIn = (): any => {
		// disableAllTools();
		setToolname('ZOOM IN');
		// let currentViewport = cornerstone.getViewport(element)
		// currentViewport.scale += 0.1
		// cornerstone.setViewport(element, currentViewport)

		cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1})
		let currentViewport = cornerstone.getViewport(element)
		currentViewport.scale += 0.1
		cornerstone.setViewport(element, currentViewport)
	}

	const handleZoomOut = () => {
		// disableAllTools();
		setToolname('ZOOM OUT');
		// let currentViewport = cornerstone.getViewport(element)
		// currentViewport.scale -= 0.1
		// cornerstone.setViewport(element, currentViewport)

		cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 1})
		let currentViewport = cornerstone.getViewport(element)
		currentViewport.scale -= 0.1
		cornerstone.setViewport(element, currentViewport)
	}

	const handleMagnify = () => {
		// disableAllTools()
		setToolname('MAGNIFY')
		// cornerstoneTools.magnify.activate(element, 1)
		// console.log('MAGNIFY CONFIG: ', cornerstoneTools.magnify.getSize)
		
		cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 })
	
	}

	const handlePan = () => {
		setToolname('PAN')
		cornerstoneTools.setToolActive('Pan', {mouseButtonMask: 1})
	}
	
	const handleContrast = () => {
		setToolname('CONTRAST');
		cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 1})
	} 

	const handleProbe = () => {
		setToolname('PROBE')
		cornerstoneTools.setToolActive('Probe', { mouseButtonMask: 1 })         
	}

	const handleAngle = () => {
		setToolname('ANGLE')
		cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })
	}

	const handleLength = () => {
		setToolname('LENGTH')		
		cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 })
	}

	const handleEllipse = () => {
		setToolname('Ellipse')
		cornerstoneTools.setToolActive('EllipticalRoi', {mouseButtonMask: 1})
	}

	const handleRectangle = () => {
		setToolname('RECTANGLE')
		cornerstoneTools.setToolActive('RectangleRoi', {mouseButtonMask: 1})
	}

	const handleFreeHand = () => {
		setToolname('FREEHANDROI')
		cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 })
		console.log('region: ', cornerstoneTools.freehandArea)
	}

	const handleEraser = () => {
		setToolname('ERASER')
		cornerstoneTools.setToolActive('Eraser', {mouseButtonMask: 1})
	}

	const handleBrush = () => {
		setToolname('BRUSH')
		const {
			getters,
			setters,
			configuration,
			state
		} = cornerstoneTools.getModule('segmentation')
		
		//pixelData2D
		cornerstoneTools.setToolActive('Brush', {mouseButtonMask: 1})
		const labelmap2D = getters.labelmap2D(element)
		console.log('labelmap2d: ', labelmap2D)
		setters.activeSegmentIndex(element, 1000)
		
		const arrayPixel = labelmap2D.labelmap2D.pixelData
		console.log('arrayPixel: ', typeof arrayPixel)
		
		// let count = 0
		// for (let j = 0; j < 262144; j++){
		// 	if (arrayPixel[j] != 0){
		// 		console.log('DIFFERENT FROM 0: ', arrayPixel[j])
		// 	}
		// 	else{
		// 		count++
		// 	}
		// }
		// console.log('Total num equal 0: ', count)
		
		
		
		// let pixelData = new Uint8ClampedArray(3);
		// for (let i = 128; i < 256; i++) {
		// 	for (let j = 256; j < 384; j++) {
		// 		pixelData[i*255 + j] = 1;
		// 	}
		// }
		// let toolState = cornerstoneTools.getToolState(element, 'brush');
		// if (toolState) {
		// 	toolState.data[0].pixelData = [...pixelData];
		// } else {
		// 	cornerstoneTools.addToolState(element, 'brush', { pixelData });
		// 	toolState = cornerstoneTools.getToolState(element, 'brush');
		// }
		// toolState.data[0].invalidated = true;
		// cornerstone.updateImage(element);
	}

	const handleCorrectionScissor = () => {
		setToolname('Correction Scissor')
		cornerstoneTools.setToolActive('CorrectionScissors', {mouseButtonMask: 1})
	}

	const handleInvert = () => {
		// disableAllTools()
		setToolname('INVERT')
		let viewport = cornerstone.getViewport(element)
		viewport.invert = !viewport.invert
		cornerstone.setViewport(element, viewport)
	}

	const handleUndo = () => {
		setToolname('UNDO')
		const { setters } = cornerstoneTools.getModule('segmentation')
		console.log('setters: ', setters)
		setters.undo(element) // 2 is default labelmapIndex
	}

	// const handlePopoverOpen = () => {

	// }

	// const handlePopoverClose = () => {


	// }

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	
	const open = Boolean(anchorEl);

	const handleReset = () => {
		setToolname('RESET')
		let currentViewport = cornerstone.getViewport(element)
		currentViewport.voi.windowWidth = 0
     	currentViewport.voi.windowCenter = 0
		cornerstone.setViewport(element, initViewport)
		cornerstoneTools.setToolPassive()
	}

	const handleHideAll = () => {
		setToolname('HIDEALL')
		
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
		
		let currentViewport = cornerstone.getViewport(element)
		currentViewport.voi.windowWidth = 0
     	currentViewport.voi.windowCenter = 0
		cornerstone.setViewport(element, initViewport)
		cornerstoneTools.setToolPassive()
	}

	console.log('CURRENT TOOLNAME: ' + toolname)

	useEffect(() => {
		readImage()
	}, []);

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
					
				</Toolbar>			
			</AppBar>
			<div className={classes.dicom}
			ref={(input) => {
				element = input
			}}></div>
		</div>		
	)
}

const LabelingWorkspace = (): JSX.Element => {
  const classes = useStyles();

  const dispatch: RootDispatchType = useDispatch();

  const [passChangeSuccess, setPassChangeSuccess] = useState(false);
	
  return (
    <Formik
      initialValues={{		
        username: '',
		email: '',
        password: '',
      }}    
      onSubmit={ () => {} }
    >
    {(
        props: FormikProps<{			
          	username: string;
			email: string;
          	password: string;			
        }>
      ) => {
        const {
        } = props;
		
        return (
          	<Container  
            className={classes.container}
            style={{backgroundColor: 'black'}} >
              	<NavigationBar/>
				<div className={classes.dicomWrapper} id="canvas">
					{/* <LoadImage/> */}
					<Dicom/>
				</div>
            </Container>
        );
      }}
    </Formik>
  );
};

export default LabelingWorkspace;
