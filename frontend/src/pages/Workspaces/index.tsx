import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { useHistory, Link, Route, BrowserRouter, Switch , useRouteMatch, useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

import BurstModeIcon from '@material-ui/icons/BurstMode';
import BarChartIcon from '@material-ui/icons/BarChart';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { logout } from 'store/actions/auth';
import * as UserServices from 'api/user';
import { RootDispatchType } from 'store';

import '../../index.scss'
import LabelingWorkspace from './components/Labeling';
import {useDropzone} from 'react-dropzone';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import classes from '*.module.css';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
    },
	dropzone: {
		width: '100%',
		height: 250,
	}
  })
);

interface UserDetailActionTypes {
  type: string;
  payload: string;
}

const initialUserDetail = {
  username: '',
  email: '',
};

function userDetailReducer(
  state = initialUserDetail,
  action: UserDetailActionTypes
) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USERNAME': {
      return {
        ...state,
        username: payload,
      };
    }
    case 'SET_EMAIL': {
      return {
        ...state,
        email: payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

interface PropsDicomDropZone {
	// imgId: string;
	getImageId: Function;

}

const DICOMDropZone = (props: PropsDicomDropZone): JSX.Element => {

	//This part is for dropzone
	const onDrop = useCallback( async (acceptedFiles: Array<File>) => {
		// setFile(acceptedFiles)
				
		const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(acceptedFiles[0]);
		props.getImageId(imageId)		

 		const imageName = acceptedFiles[0].name	
		cornerstone.loadImage(imageId).then((image) => {
			cornerstone.displayImage(element, image);
			const patientName = image.data.string('x00100010');
			// setPatientName(patientName);
		})
	}, []);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

	let element: HTMLDivElement;
	


	return (
	<div {...getRootProps()} style={{ width: "100%", height: "100%" }}>
		<input {...getInputProps()}/>
		{
			isDragActive ?
			<p>Drop here babe</p> :
			<p>Drag file here</p>
		}

		<div id="dicom" style={{width: "100%", height: "100%"}} ref={input=>{
				if (input !== null) {
					element=input; 

					cornerstone.enable(element);
				}
			}}></div>
	</div>
	)
}


interface PropsLabelContent {
	url: string;
}

const LabelContent = (props: PropsLabelContent): JSX.Element => {
	const { url } = props;
	// console.log(props);
	const history = useHistory();
	const classes = useStyles();

	const dispatch: RootDispatchType = useDispatch();

	const [userDetailState, userDetailDispatch] = useReducer(
		userDetailReducer,
		initialUserDetail
	);

	useEffect(() => {
		const loadUserDetail = async () => {
		try {
			const response = await UserServices.getUserDetail();
			userDetailDispatch({
			type: 'SET_USERNAME',
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			payload: response.data.username,
			});
			userDetailDispatch({
			type: 'SET_EMAIL',
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			payload: response.data.email,
			});
		} catch (error) {
			toast.error("Can't load User data!", {
			position: 'bottom-left',
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			});
			throw error;
		}
		};
		loadUserDetail();
	}, []);
	const [imageName, setImageName] = useState('')
	const [patientName, setPatiename] = useState('')
	const [imageId, setImageId] = useState('')
	// let { id } = useParams();
	return (
		<div>
		<Box p={0} borderRadius="none" color="black">
			<Header 
				username={userDetailState.username}
				logout={() => {
				dispatch(logout());
				}}
				changePasswordHandle={() => {
				history.push('/change_password');
				}}
				workspacesHandle={() => {
				history.push('/workspaces');
				}}
			/>
		</Box>
		<Box className="workspace-landing">
			<Box className="dataset-item">
				<BurstModeIcon className="data-item"/>
				<div className="item-bottom" style={{marginRight: 30}}>
				
					<DICOMDropZone getImageId={value=> setImageId(value)} /><br/>
					<Link to={`${url}/labeling/${imageId}`}>
						<Button 
							className="overview btn labeling-btn"
							type="submit" 
							color="primary"		
						>
							<OpenInNewIcon/>
							Label
						</Button>
					</Link>
				</div>
				
			</Box>
			<Box className="dataset-item">
				<BurstModeIcon className="data-item"/>
				<div className="item-bottom">
					<p className="data-detail title">Liver_01 patient_01</p>
					<p className="data-detail string">22T043133</p>
					<p className="data-detail id">Dataset ID: 01</p>
					<p className="data-detail total">Total Data: 100</p> 
					<p className="data-detail annotated">Annotated Data: 0</p> 
					<Link to={`${url}`}>
						<Button 
							className="overview btn overview-btn"
							type="submit" 
							color="primary"
							
						>
							<BarChartIcon />
							Overview
						</Button>
					</Link>
					<Link to={`${url}/labeling`}>
						<Button 
							className="overview btn labeling-btn"
							type="submit" 
							color="primary"									
						>
							<OpenInNewIcon />
							Label
						</Button>
					</Link>
			
				</div>
			</Box>	
			<Box className="dataset-item">
				<BurstModeIcon className="data-item"/>
				<div className="item-bottom">
					<p className="data-detail title">Liver_01 patient_01</p>
					<p className="data-detail string">22T043133</p>
					<p className="data-detail id">Dataset ID: 01</p>
					<p className="data-detail total">Total Data: 100</p> 
					<p className="data-detail annotated">Annotated Data: 0</p> 
					<Link to={`${url}`}>
						<Button 
							className="overview btn overview-btn"
							type="submit" 
							color="primary"
							
						>
							<BarChartIcon />
							Overview
						</Button>
					</Link>
					<Link to={`${url}/labeling`}>
						<Button 
							className="overview btn labeling-btn"
							type="submit" 
							color="primary"									
						>
							<OpenInNewIcon />
							Label
						</Button>
					</Link>
			
				</div>
			</Box>	
			<Box className="dataset-item">
				<BurstModeIcon className="data-item"/>
				<div className="item-bottom">
					<p className="data-detail title">Liver_01 patient_01</p>
					<p className="data-detail string">22T043133</p>
					<p className="data-detail id">Dataset ID: 01</p>
					<p className="data-detail total">Total Data: 100</p> 
					<p className="data-detail annotated">Annotated Data: 0</p> 
					<Link to={`${url}`}>
						<Button 
							className="overview btn overview-btn"
							type="submit" 
							color="primary"
							
						>
							<BarChartIcon />
							Overview
						</Button>
					</Link>
					<Link to={`${url}/labeling`}>
						<Button 
							className="overview btn labeling-btn"
							type="submit" 
							color="primary"									
						>
							<OpenInNewIcon />
							Label
						</Button>
					</Link>
			
				</div>
			</Box>	
			<Box className="dataset-item">
				<BurstModeIcon className="data-item"/>
				<div className="item-bottom">
					<p className="data-detail title">Liver_01 patient_01</p>
					<p className="data-detail string">22T043133</p>
					<p className="data-detail id">Dataset ID: 01</p>
					<p className="data-detail total">Total Data: 100</p> 
					<p className="data-detail annotated">Annotated Data: 0</p> 
					<Link to={`${url}`}>
						<Button 
							className="overview btn overview-btn"
							type="submit" 
							color="primary"
							
						>
							<BarChartIcon />
							Overview
						</Button>
					</Link>
					<Link to={`${url}/labeling`}>
						<Button 
							className="overview btn labeling-btn"
							type="submit" 
							color="primary"									
						>
							<OpenInNewIcon />
							Label
						</Button>
					</Link>
			
				</div>
			</Box>				
		</Box>
		</div>
	);
};

const WorkspacesLayout = (): JSX.Element => {
	const { path, url } = useRouteMatch();

	const classes = useStyles();
  
	return (
		<div className={classes.root}>
		<Helmet>
			<meta charSet="utf-8" />
			<title>DAT 2 | Workspaces</title>
			<link rel="canonical" href="http://mysite.com/example" />
		</Helmet>

		<Box
			height="100%"
			display="flex"
			flexDirection="column"
			justifyItems="space-between"
		>
		

			<Box flexGrow={0}/>
				<Switch>
					<Route exact path={path} render={() =>  <LabelContent url={url} /> } />
					<Route path="/overview">
						<LabelingWorkspace/>
					</Route>
					<Route exact path={`${url}/labeling/:imageId`} render={() => <LabelingWorkspace/>} />
						{/* <LabelingWorkspace/> */}
					
				</Switch>
				
				
				<Box p={0}>
					<Footer />
				</Box>

			</Box>
		</div>
	);
};

export default WorkspacesLayout;
