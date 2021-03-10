import React, { useState } from 'react';
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Chip,
  MenuItem,
  Menu,
  MenuProps,
  Button
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import '../index.scss';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  />
));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    root_appbar: {
      backgroundColor: '#4285F4',
      minHeight: '45px',
    },
    appbar: {
      paddingLeft: 0,
      borderLeft: 'none',
    },
    grow: {
      flexGrow: 1,
    },
    chip: {
      // margin: theme.spacing(1),
      marginRight: 0,
      backgroundColor: 'transparent',
      // color: '#0844a7',
      color: '#ffffff',
      fontSize: '1.2rem',
      float: 'right',
      textDecoration: 'none',
    },
    accountcircleicon: {
      color: '#fff',
    },
    toolbar: {
      padding: '0',
      margin: 0,
      width: '100%',
    },
    
  })
);

interface HeaderProps {
  username: string;
  logout: () => void;
  changePasswordHandle: () => void;
  workspacesHandle: () => void;
}

function HeaderWorkspaces({
  username,
  logout,
  changePasswordHandle,
  workspacesHandle,
}: HeaderProps) {
  const classes = useStyles();

  // const [open, setOpen] = useState(false);
  const open = false;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePassword = () => {
    setAnchorEl(null);
    changePasswordHandle();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      {/* <AppBar position="static" className={classes.root_appbar}> */}
        <Toolbar disableGutters={!open} className={classes.toolbar} id="toolbar">
          <IconButton 
            id="home"
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              workspacesHandle();
            }}
          >
            <Home />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Data Annotation Tool - GVLab
          </Typography>
          <div id="right-btn">
            <Button id="right" onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}>
              <AccountCircleIcon style={{color: '#fff'}}/>
              <Chip              
                label={username}
                clickable={false}
                className={classes.chip}
                id="username"
                // onClick={(event) => {
                //   setAnchorEl(event.currentTarget);
                // }}
              />
            </Button>
           
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  workspacesHandle();
                }}
              >
                <AspectRatioIcon id="menu-icon"/>
                Main Workspace
              </MenuItem>
              <MenuItem onClick={handlePassword}>
                <VpnKeyIcon id="menu-icon"/>
                Change Password</MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToAppIcon id="menu-icon"/>
                Log out</MenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      {/* </AppBar> */}
    </div>
  );
}

export default React.memo(HeaderWorkspaces);
