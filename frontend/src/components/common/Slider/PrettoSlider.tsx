import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 6,
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -6,
    marginLeft: -10,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-85% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default React.memo(PrettoSlider);
