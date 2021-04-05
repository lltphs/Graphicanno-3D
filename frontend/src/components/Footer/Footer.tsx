import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: '#c1c1c1',
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',      
      marginTop: '5rem',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    },
  })
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/dientoanbachkhoa/">
        Data Annotation Tool Version 2 - GVLab
      </Link>
      {` ${new Date().getFullYear()}`}
    </Typography>
  );
}

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Copyright />
    </div>
  );
}

export default React.memo(Footer);
