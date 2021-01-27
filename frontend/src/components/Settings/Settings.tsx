import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListSubheader,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import { RootStateType } from 'store';
import {
  setShowPopup,
  setShowLabel,
  setAutoHidden,
  setAskDialog,
  setSizeIcon,
  setWidthStroke,
  setZoomSpeed,
} from 'store/actions/settings';

import { WhiteTooltip } from 'components/common/Tooltip';
import { ListItemBoolean, ListItemInt } from 'components/common/ListItem';

import * as UserServices from 'api/user';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//     },
//     infoIcon: {
//       marginLeft: '5px',
//     },
//   })
// );

const Settings = (): JSX.Element => {
  // const classes = useStyles();

  const [open, setOpen] = useState(true);

  const settings = useSelector((state: RootStateType) => state.settings);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    (async () => {
      try {
        await UserServices.setUserSettings(settings);
        toast.info('Save settings success', {
          position: 'bottom-left',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      } catch (error) {
        toast.error("Can't save settings!", {
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
    })();
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Settings</DialogTitle>
      <DialogContent>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItemBoolean
            value={settings.showPopup}
            title="Show popup"
            description="TODO"
            handleChange={(value: boolean) => {
              dispatch(setShowPopup(value));
            }}
          />

          <ListItemBoolean
            value={settings.showLabel}
            title="Show label"
            description="Show label when labeling"
            handleChange={(value: boolean) => {
              dispatch(setShowLabel(value));
            }}
          />

          <ListItemBoolean
            value={settings.autoHidden}
            title="Auto hidden"
            description="Auto hidden box when finished draw"
            handleChange={(value: boolean) => {
              dispatch(setAutoHidden(value));
            }}
          />

          <ListItemBoolean
            value={settings.askDialog}
            title="Ask dialog"
            description="Ask user before saving or skipping"
            handleChange={(value: boolean) => {
              dispatch(setAskDialog(value));
            }}
          />

          <ListItemInt
            value={settings.sizeIcon}
            title="Icon size"
            description="Size of icon"
            handleChange={(value: number) => {
              dispatch(setSizeIcon(value));
            }}
          />

          <ListItemInt
            value={settings.widthStroke}
            title="Width Stroke"
            description="Width of stroke when drawing"
            handleChange={(value: number) => {
              dispatch(setWidthStroke(value));
            }}
          />

          <ListItemInt
            value={settings.zoomSpeed}
            title="Zoom speed"
            description="Zoom speed"
            handleChange={(value: number) => {
              dispatch(setZoomSpeed(value));
            }}
          />
        </List>
      </DialogContent>
      <DialogActions>
        <WhiteTooltip title="Save all settings">
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </WhiteTooltip>
        <WhiteTooltip title="Close without saving">
          <Button color="primary" onClick={handleClose}>
            Close
          </Button>
        </WhiteTooltip>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
