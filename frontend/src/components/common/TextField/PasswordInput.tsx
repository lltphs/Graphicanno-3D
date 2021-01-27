import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField, TextFieldProps, InputAdornment } from '@material-ui/core';
import { RemoveRedEye } from '@material-ui/icons';

const useStyles = makeStyles(() =>
  createStyles({
    eye: {
      cursor: 'pointer',
    },
  })
);

const PasswordInput = (props: TextFieldProps): JSX.Element => {
  const classes = useStyles();
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);
  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };
  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type={passwordIsMasked ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <RemoveRedEye
              className={classes.eye}
              onClick={togglePasswordMask}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default React.memo(PasswordInput);
