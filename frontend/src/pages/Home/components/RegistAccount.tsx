import React, { useState } from 'react';
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
  
  CircularProgress,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

const RegistForm = (): JSX.Element => {
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
          	<Container component="main" maxWidth="xs">
            	<div className={classes.paper}>
					<Avatar className={classes.avatar} src="../assets/login.svg" 
					style={{ textDecoration: 'inherit', marginTop: '20px' }}/>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
              		<form className={classes.form} noValidate onSubmit={handleSubmit}>
					  	<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							name="username"
							label="UserName"
							autoComplete="username"
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
							autoFocus
							error={Boolean(touched.username && errors.username)}
							helperText={
								touched.username && errors.username ? errors.username : ''
							}
							disabled={isSubmitting}
						/>
						<TextField
							variant="outlined" 
              margin="normal"
							required 
              fullWidth
							id="email" 
              name="email" 
              label="Email"
							autoComplete="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							autoFocus
							error={Boolean(touched.email && errors.email)}
							helperText={
								touched.email && errors.email ? errors.email : ''
							}
							disabled={isSubmitting}
						/>						
						<PasswordInput
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="password"
							label="Password"
							name="password"
							type="password"
							autoComplete="current-password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							error={Boolean(touched.password && errors.password)}
							helperText={
								touched.password && errors.password ? errors.password : ''
							}
							disabled={isSubmitting}
						/>
						{isSubmitting && <ColoredLinearProgress />}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							id="btn"
							// onClick = {() => handleLogin}
							disabled={Boolean(!isValid || isSubmitting)}
							className={classes.submit}

						>
						Sign Up
							{isSubmitting && (
								<CircularProgress size={14} style={{ marginLeft: 5 }} />
							)}
						</Button>
						<Grid container>
						<Grid item xs>
							<Link to="/home" className="r-signin">
							Already have account? Sign in
							</Link>                    
						</Grid>
						
						</Grid>
					</form>
          {renderModal()}
				</div>
			</Container>
        );
      }}
    </Formik>
  );
};

export default RegistForm;
