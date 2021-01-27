import React from 'react';

import { withStyles, Theme } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

const styles = (theme: Theme) => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default React.memo(withStyles(styles, { withTheme: true })(Tooltip));
