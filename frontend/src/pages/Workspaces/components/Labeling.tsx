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

cornerstoneWebImageLoader.external.cornerstone = cornerstone
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneTools.external.Hammer = Hammer
cornerstoneTools.init(
	{
		// showSVGCursors: true,
	}
);

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
					<Annotation nrrdUrl='http://localhost/api/get-nrrd-volume/admin/liver_01^patient/undefined/'/>
				</div>
            </Container>
        );
      }}
    </Formik>
  );
};

export default LabelingWorkspace;
