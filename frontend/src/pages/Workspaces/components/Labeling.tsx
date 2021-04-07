import React, { useState, Component } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
import { object, string } from 'yup';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Avatar,
  Typography,
  TextField,
  Grid,
  Box,
  CircularProgress
} from '@material-ui/core';

// import authenticate from django.contrib.auth ;
import Alert from 'components/common/Alert';
import PasswordInput from 'components/common/TextField/PasswordInput';
import ColoredLinearProgress from 'components/common/Progress/ColoredLinearProgress';
import { register } from 'store/actions/auth';
import { RootDispatchType } from 'store';
import 'pages/Home/index.scss';
import { boolean } from 'yup/lib/locale';
// import LoginForm from './UserLoginForm';
import NavigationBar from './NavBarBtn';
import LoadImage from './DicomImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      padding: 0
    },
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(0),
	//   marginTop: 0,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textfiled: {
      color: 'black',
    },
    dicom: {
      width: '100%',
      height: `calc(100% - 260px)`,
      marginTop: 164,
      marginLeft: 72,
      margin: 'auto'
    },
  })
);

const LabelingWorkspace = (): JSX.Element => {
  const classes = useStyles();

  const dispatch: RootDispatchType = useDispatch();

  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  const handleModalClose: () => void = () => {
    setPassChangeSuccess(false);
  };

  const renderModal = () => {
    const onClick = () => {
      setPassChangeSuccess(false);
    };
    return (
      <Alert
        isOpen={passChangeSuccess}
        handleClose={handleModalClose}
        handleSubmit={onClick}
        title="Regist failed!"
        text="Please check your informations"
        submitButtonText="OK"
        hasTwoButtons={false}
      />
    );
  };

  const handleRegist = (
    username: string,
	  email: string,
    password: string,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void
  ) => {
    dispatch(register(username, email, password));
    // const isLogin:string = "handled";
    setTimeout(() => {
      setSubmitting(false);
      setPassChangeSuccess(true);
      resetForm();
    }, 700);
  };

  return (
    <Formik
      initialValues={{		
        username: '',
		    email: '',
        password: '',
      }}
      validationSchema={object().shape({
        username: string().required('Username is required'),
		    email: string().required('Email is required'),
        password: string().required('Password is required')
      })}
      onSubmit={({ username, email, password }, { setSubmitting, resetForm }) =>
        handleRegist(username, email, password, setSubmitting, resetForm)
      }
      validateOnBlur
    >
      {(
        props: FormikProps<{			
          	username: string;
			email: string;
          	password: string;			
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
          	<Container  
            className={classes.container}
            style={{backgroundColor: 'black'}} >
              <NavigationBar/>
              
              <div className={classes.dicom} id="canvasa">
                <LoadImage/>
              </div>
            </Container>
        );
      }}
    </Formik>
  );
};

export default LabelingWorkspace;
