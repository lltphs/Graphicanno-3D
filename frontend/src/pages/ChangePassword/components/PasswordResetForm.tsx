import React, { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { object, ref, string } from 'yup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Avatar,
  Typography,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Alert from 'components/common/Alert/Alert';
import ColoredLinearProgress from 'components/common/Progress/ColoredLinearProgress';
import * as AuthService from 'api/auth';

import { RootDispatchType } from 'store';
import { logout } from 'store/actions/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

const FormPasswordReset = (): JSX.Element => {
  const classes = useStyles();

  const dispatch: RootDispatchType = useDispatch();

  const [passChangeSuccess, setPassChangeSuccess] = useState(false);
  const [passChangeWrong, setPassChangeWrong] = useState(false);
  const [passChangeNotConnected, setPassChangeNotConnected] = useState(false);

  const renderModalSuccess = () => {
    const handleModalClose = () => {
      setPassChangeSuccess(false);
    };

    const onClick = () => {
      setTimeout(() => {
        localStorage.removeItem('user');
        dispatch(logout());
      }, 500);
      setPassChangeSuccess(false);
    };

    return (
      <Alert
        isOpen={passChangeSuccess}
        handleClose={handleModalClose}
        handleSubmit={onClick}
        title="Password Reset"
        text="Your password was changed successfully"
        submitButtonText="Done"
        hasTwoButtons={false}
      />
    );
  };

  const renderModalWrong = () => {
    const handleModalClose = () => {
      setPassChangeWrong(false);
    };

    const onClick = () => {
      setPassChangeWrong(false);
    };
    return (
      <Alert
        isOpen={passChangeWrong}
        handleClose={handleModalClose}
        handleSubmit={onClick}
        title="Password Reset"
        text="Wrong password"
        submitButtonText="Done"
        hasTwoButtons={false}
      />
    );
  };

  const renderModalNotConnected = () => {
    const handleModalClose = () => {
      setPassChangeNotConnected(false);
    };

    const onClick = () => {
      setPassChangeNotConnected(false);
    };
    return (
      <Alert
        isOpen={passChangeNotConnected}
        handleClose={handleModalClose}
        handleSubmit={onClick}
        title="Password Reset"
        text="Wrong password"
        submitButtonText="Done"
        hasTwoButtons={false}
      />
    );
  };

  const handleChangePassword = (
    currentPass: string,
    newPass: string,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void
  ) => {
    (async () => {
      const response = await AuthService.changePassword(currentPass, newPass);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (response.data.status && response.data.status === 'wrong') {
        setSubmitting(false);

        setPassChangeWrong(true);
        resetForm();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } else if (response.data.status && response.data.status === 'success') {
        setSubmitting(false);

        setPassChangeSuccess(true);
        resetForm();
      }
    })();
  };

  return (
    <Formik
      initialValues={{
        currentPass: '',
        newPass: '',
        confirmPass: '',
      }}
      validationSchema={object().shape({
        currentPass: string().required('Current password is required'),
        newPass: string().required('New password is required'),
        confirmPass: string()
          .oneOf([ref('newPass')], 'Passwords do not match')
          .required('Password is required'),
      })}
      onSubmit={({ currentPass, newPass }, { setSubmitting, resetForm }) =>
        handleChangePassword(currentPass, newPass, setSubmitting, resetForm)
      }
    >
      {(
        props: FormikProps<{
          currentPass: string;
          newPass: string;
          confirmPass: string;
        }>
      ) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
        } = props;
        return (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar} src="../assets/login.svg" />
              <Typography component="h1" variant="h5">
                Password Reset
              </Typography>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password-current"
                  label="Current Password"
                  name="currentPass"
                  type="password"
                  autoComplete="current-password"
                  value={values.currentPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                  error={Boolean(touched.currentPass && errors.currentPass)}
                  helperText={
                    touched.currentPass && errors.currentPass
                      ? errors.currentPass
                      : ''
                  }
                  disabled={isSubmitting}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password-new"
                  label="New Password"
                  name="newPass"
                  type="password"
                  autoComplete="new-password"
                  value={values.newPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.newPass && errors.newPass)}
                  helperText={
                    touched.newPass && errors.newPass ? errors.newPass : ''
                  }
                  disabled={isSubmitting}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password-confirm"
                  label="Confirm Password"
                  name="confirmPass"
                  type="password"
                  autoComplete="new-password"
                  value={values.confirmPass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                  helperText={
                    touched.confirmPass && errors.confirmPass
                      ? errors.confirmPass
                      : ''
                  }
                  disabled={isSubmitting}
                />
                {isSubmitting && <ColoredLinearProgress />}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={Boolean(!isValid || isSubmitting)}
                  className={classes.submit}
                >
                  Reset Password
                  {isSubmitting && (
                    <CircularProgress size={14} style={{ marginLeft: 5 }} />
                  )}
                </Button>
              </form>
              {renderModalSuccess()}
              {renderModalWrong()}
              {renderModalNotConnected()}
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default FormPasswordReset;
