import React, { memo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, Tooltip, Zoom } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemRoot: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      paddingTop: '2px',
      paddingBottom: '2px',
    },
    lightToolTip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    listItemIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      padding: '5px',
    },
  })
);

interface PropsItemTool {
  idI: string;
  callBackFunc: () => void;
  text: string;
  Micon: React.ComponentType;
  backgroundColor: string;
}

const ItemTool = memo((props: PropsItemTool) => {
  const classes = useStyles();
  const { idI, callBackFunc, text, Micon, backgroundColor } = props;
  return (
    <ListItem
      button
      classes={{ root: classes.listItemRoot }}
      id={idI}
      onClick={callBackFunc}
      style={{ backgroundColor }}
    >
      <Tooltip
        title={text}
        TransitionComponent={Zoom}
        placement="right"
        classes={{ tooltip: classes.lightToolTip }}
      >
        <ListItemIcon className={classes.listItemIcon}>
          <Micon />
        </ListItemIcon>
      </Tooltip>
    </ListItem>
  );
});

export default ItemTool;
