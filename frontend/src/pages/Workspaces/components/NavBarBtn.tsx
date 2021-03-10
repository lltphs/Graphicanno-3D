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
  Typography,
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  List,
  ListItemText
 } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Home } from '@material-ui/icons';

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
		backgroundColor: '#4285F4',
		paddingRight: 0,
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
	  menuIcon: {

	  },
	  menuButton: {
		marginRight: 10,
	  },
	  hide: {
		display: 'none',
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
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	  },
	  content: {
		flexGrow: 1,
		padding: theme.spacing(3),
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
      <div className={classes.root} style={{marginTop: '70px'}}>
		<CssBaseline />
		<AppBar
			id="app-bar"
			position="fixed" 
			className={clsx(classes.appBar, {
			[classes.appBarShift]: open,
			})}
		>
			<Toolbar >
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
				{/* <Typography variant="h6" noWrap>
					Data Annotation Tool - GVLab
				</Typography> */}
			</Toolbar>
		</AppBar>
		<Drawer 
			variant="permanent"
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
			<List>
			{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
				<ListItem button key={text}>
				<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
				<ListItemText primary={text} />
				</ListItem>
			))}
			</List>
			<Divider />
			<List>
			{['All mail', 'Trash', 'Spam'].map((text, index) => (
				<ListItem button key={text}>
				<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
				<ListItemText primary={text} />
				</ListItem>
			))}
			</List>
		</Drawer>
    </div>
    );
};

export default NavigationBar;