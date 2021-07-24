import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar
 } from '@material-ui/core';

import { RootDispatchType } from 'store';
import { logout } from 'store/actions/auth';
import * as UserServices from 'api/user';

import '../index.scss';
import HeaderWorkspaces from '../HeaderWorkspaces';

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


const NavigationBar = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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
		<AppBar
			id="app-bar"
			position="fixed" 
			className={clsx(classes.appBar, {
			[classes.appBarShift]: open,
			})}
		>
			<Toolbar className={classes.toolbar}>
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
	</div>
	);
};

export default NavigationBar;