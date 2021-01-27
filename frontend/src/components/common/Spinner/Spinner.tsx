import React from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

const Spinner = (props: CircularProgressProps): JSX.Element => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <CircularProgress color="primary" {...props} />
  </div>
);

export default React.memo(Spinner);
