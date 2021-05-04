import React, { useReducer, useEffect } from 'react';
import { useHistory, Link, Route, BrowserRouter, Switch , useRouteMatch} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import Routes from '../App/Routes';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  ListItemText,
  Box,
  Button
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
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import AdjustIcon from '@material-ui/icons/Adjust';
import GestureIcon from '@material-ui/icons/Gesture';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { RootDispatchType } from 'store';
import { logout } from 'store/actions/auth';
import * as UserServices from 'api/user';
// import HeaderWorkspcesa from './HeaderWorkspces';

import '../index.scss';
import HeaderWorkspaces from './HeaderWorkspces';

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


const NavigationBar: React.FC = () => {
    const classes = useStyles();   
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
	// const { path, url } = useRouteMatch();

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
		{/* <AppBar style={{
			display: 'flex'
					}}
				className={clsx(classes.secondAppBar, {
					[classes.secondAppBarShift]: open,
					})}
				id="2nd-app-bar">
			<Toolbar id="2nd-toolbar">
				<Button className="item-btn">
					<ZoomInIcon id="zoom-in" className="item-icon"/>
					<br/>
					Zoom In
				</Button>
				<Button className="item-btn">
					<ZoomOutIcon id="zoom-in" className="item-icon"/>
					<br/>
					Zoom Out
				</Button>
				<Button className="item-btn">
					<AdjustIcon id="zoom-in" className="item-icon"/>
					<br/>
					Magnify
				</Button>
				<Button className="item-btn">
					<GestureIcon id="zoom-in" className="item-icon"/>
					<br/>
					Draw
				</Button>
				<Button className="item-btn">
					<Brightness5Icon id="zoom-in" className="item-icon"/>
					<br/>
					Brightness
				</Button>
				<Button className="item-btn">
					<WbSunnyIcon id="zoom-in" className="item-icon"/>
					<br/>
					Constrast
				</Button>
				<Button className="item-btn">
					<HistoryIcon id="zoom-in" className="item-icon"/>
					<br/>
					Under
				</Button>
				<Button className="item-btn">
					<VisibilityOffIcon id="zoom-in" className="item-icon"/>
					<br/>
					Hide all
				</Button>
				
			</Toolbar>			
		</AppBar> */}
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

			<Divider />
			
			<div id="toggle_language" className="item"		
			// 	onClick={function(e){
            //     medical_label_state.notify_toggle_language();
            // }}
			>
                <ListItem button id='toggle_language_fake_tag' className="item">
                    <Tooltip title='Vietnamese' 
					// TransitionComponent={Zoom} 
					placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <LanguageIcon />
                        </ListItemIcon>
                    </Tooltip>
                    {/* <ListItemText primary={medical_label_state.state._language}/> */}
                </ListItem>
            </div>

			<div id="next_slice" 
			// onClick={function(e){
            //     medical_label_state.notify_next_slice();
            // }}
			>
                <ListItem button id='next_slice_fake_tag' className="item">
                    <Tooltip title='Next Slice' 
					// TransitionComponent={Zoom} placement="right" classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <ArrowForward />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._forward}
					/>
                </ListItem>
            </div>

            <div id="prev_slice" 
			// onClick={function(e){
                // medical_label_state.notify_prev_slice();
            // }}
			>
                <ListItem button id='prev_slice_fake_tag' className="item">
                    <Tooltip title='Previous Slice' 
					// TransitionComponent={Zoom} placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <ArrowBack />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._backward}
					/>
                </ListItem>
            </div>

            <div id="show_all_labels" 
			// onClick={function(e){
                // medical_label_state.setLabelId(1);
                // medical_label_state.notify_label_selected();
            // }}
			>
                <ListItem button id='show_all_labels_fake_tag' className="item">
                    <Tooltip title='Show all labels' 
					// TransitionComponent={Zoom} 
					// placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <RemoveRedEye />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._show_all_labels}
					/>
                </ListItem>
            </div>

            <div id="hide_all_labels" 
			// onClick={function(e){
                // medical_label_state.setLabelId(0);
                // medical_label_state.notify_label_selected();
            // }}
			>
                <ListItem button id='hide_all_labels_fake_tag' className="item">
                    <Tooltip title= "Hide all labels" 
					// TransitionComponent={Zoom} 
					// placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <RemoveCircle />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._hide_all_labels}
					/>
                </ListItem>
            </div>

            <div id="boundary_mode" 
			// onClick={function(e){
                // medical_label_state.switch_boundary_mode();
            // }}
			>
                <ListItem button id='boundary_mode_fake_tag' className="item">
                    <Tooltip title="Boundary Mode" 
					// TransitionComponent={Zoom} 
					// placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <BorderOuter />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._boundary_mode}
					/>
                </ListItem>
            </div>
            
            <div id="load_saved_mask" 
			// onClick={function(e){
                // medical_label_state.load_saved_mask();
            // }}
			>
                <ListItem button id='load_saved_mask_fake_tag' className="item">
                    <Tooltip title="Load saved mask" 
					// TransitionComponent={Zoom} 
					// placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <PublishIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._load_saved_mask} 
					/>
                </ListItem>
            </div>

            <div id="save_your_mask" 
			// onClick={function(e){
                // medical_label_state.save_your_mask();
            // }}
			>
                <ListItem button id='save_your_mask_fake_tag' className="item">
                    <Tooltip title="Save your mask" 
					// TransitionComponent={Zoom} placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <GetAppIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._save_your_mask} 
					/>
                </ListItem>
            </div>
            
            <div id="load_ai_prediction" 
			// onClick={function(e){
                // medical_label_state.load_ai_prediction();
            // }}
			>
                <ListItem button id='load_ai_prediction_fake_tag' className="item">
                    <Tooltip title="AI prediction" 
					// TransitionComponent={Zoom} placement="right" 
					// classes={{tooltip: classes.lightTooltip}}
					>
                        <ListItemIcon 
						// className={classes.icon}
						>
                            <FontDownloadIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText 
					// primary={medical_label_state.state._AI_prediction}
					/>
                </ListItem>

            </div>
			
		</Drawer>
		
    </div>
    );
};

export default NavigationBar;