import React, { useState } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { login } from 'store/actions/auth';
import { RootDispatchType } from 'store';
import 'pages/Home/index.scss';
import { boolean } from 'yup/lib/locale';

import RegistForm from './RegistAccount';

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
		textfiled: {
			color: 'black',
		},
	})
);

const LoginForm = (): JSX.Element => {
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
				title="Login failed!"
				text="Please check your username/password"
				submitButtonText="OK"
				hasTwoButtons={false}
			/>
		);
	};

	const handleLogin = (
		username: string,
		password: string,
		setSubmitting: (isSubmitting: boolean) => void,
		resetForm: () => void
	) => {
		dispatch(login(username, password));
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
				password: '',
			}}
			validationSchema={object().shape({
				username: string().required('Username is required'),
				password: string().required('Password is required'),
			})}
			onSubmit={({ username, password }, { setSubmitting, resetForm }) =>
				handleLogin(username, password, setSubmitting, resetForm)
			}
			validateOnBlur
		>
			{(
				props: FormikProps<{
					username: string;
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
						
						{/* <Link to="/home"></Link>
						<Route path="/home"> </Route> */}
						<div className={classes.paper}>
							<Avatar className={classes.avatar} src="../assets/login.svg" />
							<Typography component="h1" variant="h5">
								Sign in
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
									Sign In
									{isSubmitting && (
										<CircularProgress size={14} style={{ marginLeft: 5 }} />
									)}
								</Button>
		
							</form>
				
							{renderModal()}
						</div>
								
					</Container>
					
				);
			}}
		</Formik>
	);
};

export default LoginForm;
