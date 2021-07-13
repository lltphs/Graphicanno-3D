import { Button, Popover, Typography } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import { mdiUndo } from '@mdi/js';
import * as cornerstoneTools from 'cornerstone-tools';
import { useState } from 'react';
import useStyles from '../../Style/Style';

const UndoButton = ({ cornerstoneElementRef }) => {
  const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

  return (
    <Button className="item-btn"
      onClick={() => handleUndo(cornerstoneElementRef)}
      onMouseEnter={(event) => handlePopoverOpen(event, setAnchorEl)}
      onMouseLeave={() => handlePopoverClose(setAnchorEl)}>
      <HistoryIcon path={mdiUndo} className="item-icon" />
      <br/>
      Undo
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.papers,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>Only use for Brush Tool</Typography>
      </Popover>
    </Button>
  );
};

const handleUndo = (cornerstoneElementRef) => {
  const { setters } = cornerstoneTools.getModule('segmentation');
  setters.undo(cornerstoneElementRef.current); // 2 is default labelmapIndex
}

const handlePopoverOpen = (event, setAnchorEl) => {
  setAnchorEl(event.currentTarget);
};

const handlePopoverClose = (setAnchorEl) => {
  setAnchorEl(null);
};

export default UndoButton;