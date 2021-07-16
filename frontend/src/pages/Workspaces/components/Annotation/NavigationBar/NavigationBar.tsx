import React, { useReducer, useEffect } from 'react';
import { useHistory, Link, Route, BrowserRouter, Switch , useRouteMatch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  ListItemText
 } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import LanguageIcon from '@material-ui/icons/Language';
import { ArrowBack, ArrowForward, BorderOuter, RemoveCircle, RemoveRedEye } from '@material-ui/icons';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';

import { RootDispatchType } from 'store';
import { logout } from 'store/actions/auth';
import * as UserServices from 'api/user';

import '../index.scss';
import HeaderWorkspaces from '../HeaderWorkspaces';
import LoadAIPredictionButton from './Items/LoadAIPredictionButton';
import SaveYourWorkButton from './Items/SaveYourWorkButton';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	  },
	  appBar: {
		backgroundColor: '#1f2b6d',
		padding: 0,
		marginRight: 0,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.leavingScreen,
		}),
	  },
	  appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.enteringScreen,
		}),
	  },
	  secondAppBar: {
		width: `calc(100% - 72px)`,
		marginTop: 64, 
		marginLeft: 72,
		height: 100,
		maxWidth: '100%',
		backgroundColor: 'white', 
		borderBottom: 'solid 1px #ccc',
		boxShadow: 'none',
		display: 'flex',
	  },
	  secondAppBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
	  },
	  menuIcon: {

	  },
	  menuButton: {
		marginRight: 10,
	  },
	  hide: {
		display: 'none',
	  },
	  header: {
		paddingLeft: 10
	  },
	  drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	  },
	  drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.enteringScreen,
		}),
	  },
	  drawerClose: {
		transition: theme.transitions.create('width', {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
		  width: theme.spacing(9) + 1,
		},
	  },
	  toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingRight: 0,
		borderLeft: 'none',
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	  },
	  listitem: {
		  height: 50,
	  },
	  zoominicon: {
		  width: 40,
		  height: 40,
		  color: 'black',
		  margin: 'auto',
		  alignItems: 'center',
	  },
	 
}));

interface NavBarProps {
	workspacesHandle: () => void;
}

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


const NavigationBar = ({ sliceRef, matNVol, cornerstoneElementRef }) => {
    const classes = useStyles();   
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

	const history = useHistory();

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
			payload: response.data.username,
			});
			userDetailDispatch({
			type: 'SET_EMAIL',
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
    
    return (
      <div className={classes.root}>
		<CssBaseline />
		<AppBar
			id="app-bar"
			position="fixed" 
			className={clsx(classes.appBar, {
			[classes.appBarShift]: open,
			})}
		>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					className={clsx(classes.menuButton, {
					[classes.hide]: open,
					})}
				>
					<MenuIcon />
				</IconButton>
				
				<HeaderWorkspaces	
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
				</Toolbar>
		</AppBar>
		<Drawer 
			variant="permanent"
			id="drawer"
			className={clsx(classes.drawer, {
			[classes.drawerOpen]: open,
			[classes.drawerClose]: !open,
			})}
			classes={{
			paper: clsx({
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			}),
			}}
		>		
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>

			<Divider/>
			
			<div id="toggle_language" className="item">
				<ListItem button id='toggle_language_fake_tag' className="item">
					<Tooltip title='Vietnamese' placement="right">
						<ListItemIcon>
							<LanguageIcon />
						</ListItemIcon>
					</Tooltip>
				</ListItem>
      </div>

			<div id="next_slice">
				<ListItem button id='next_slice_fake_tag' className="item">
					<Tooltip title='Next Slice'>
						<ListItemIcon>
							<ArrowForward />
						</ListItemIcon>
					</Tooltip>
					<ListItemText/>
				</ListItem>
      </div>

			<div id="prev_slice">
				<ListItem button id='prev_slice_fake_tag' className="item">
					<Tooltip title='Previous Slice'>
						<ListItemIcon>
							<ArrowBack />
						</ListItemIcon>
					</Tooltip>
					<ListItemText/>
				</ListItem>
			</div>

			<div id="show_all_labels">
				<ListItem button id='show_all_labels_fake_tag' className="item">
					<Tooltip title='Show all labels'>
						<ListItemIcon>
							<RemoveRedEye />
						</ListItemIcon>
					</Tooltip>
					<ListItemText/>
				</ListItem>
			</div>

			<div id="hide_all_labels">
				<ListItem button id='hide_all_labels_fake_tag' className="item">
					<Tooltip title= "Hide all labels">
						<ListItemIcon>
							<RemoveCircle />
						</ListItemIcon>
					</Tooltip>
					<ListItemText/>
				</ListItem>
			</div>

			<div id="boundary_mode">
				<ListItem button id='boundary_mode_fake_tag' className="item">
					<Tooltip title="Boundary Mode">
						<ListItemIcon>
							<BorderOuter />
						</ListItemIcon>
					</Tooltip>
					<ListItemText/>
				</ListItem>
			</div>
            
			<div id="load_saved_mask">
				<ListItem button id='load_saved_mask_fake_tag' className="item">
					<Tooltip title="Load saved mask">
						<ListItemIcon>
							<PublishIcon />
						</ListItemIcon>
					</Tooltip>
					<ListItemText/>
				</ListItem>
			</div>

			<SaveYourWorkButton matNVol={matNVol} storageUrl='http://localhost/api/post-annotation/admin/liver_01^patient/undefined/'/>

			<LoadAIPredictionButton sliceRef={sliceRef} matNVol={matNVol} cornerstoneElementRef={cornerstoneElementRef} nrrdUrl='http://localhost/api/get-nrrd-annotation/admin/liver_01^patient/undefined/'/>
		</Drawer>
	</div>
	);
};

export default NavigationBar;