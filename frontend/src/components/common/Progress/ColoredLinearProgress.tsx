import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    colorPrimary: {
      backgroundColor: '#e8eaf6',
    },
    barColorPrimary: {
      backgroundColor: '#03a9f4',
    },
  })
);

function ColoredLinearProgress() {
  const classes = useStyles();
  return (
    <LinearProgress
      classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
      }}
    />
  );
}

export default React.memo(ColoredLinearProgress);
