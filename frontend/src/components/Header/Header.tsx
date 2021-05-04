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

import '../../index.scss'

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
      backgroundColor: '#1f2b6d',
      minHeight: '45px',
      boxShadow: '0 7px 7px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.2)'
    },
    appbar: {
      paddingLeft: 0,
      borderBottom: '1px solid black'
    },
    grow: {
      flexGrow: 1,
    },
    chip: {
      margin: theme.spacing(1),
      backgroundColor: '#FFFFFF',
      color: '#0844a7',
      fontSize: '1rem',
    },
    toolbar: {
      padding: '0 24px',
    },
  })
);

interface HeaderProps {
  username: string;
  logout: () => void;
  changePasswordHandle: () => void;
  workspacesHandle: () => void;
}

function Header({
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
      <CssBaseline />
      <AppBar position="static" className={classes.root_appbar}>
        <Toolbar disableGutters={!open} className={classes.toolbar} id="toolbar">
          <IconButton
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
          <div>
            <Button id="right" onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}>
              <AccountCircleIcon id="account-circle"/>
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
      </AppBar>
    </div>
  );
}

export default React.memo(Header);
