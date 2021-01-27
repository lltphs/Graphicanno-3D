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
} from '@material-ui/core';
import { Home } from '@material-ui/icons';

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
        <Toolbar disableGutters={!open} className={classes.toolbar}>
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
            <Chip
              label={username}
              clickable={false}
              className={classes.chip}
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            />
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
                Main Workspace
              </MenuItem>
              <MenuItem onClick={handlePassword}>Change Password</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default React.memo(Header);
