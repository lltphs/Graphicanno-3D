import React from 'react';
import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import LoginWithAdmin from './components/AdminLoginForm';
import LoginForm from './components/UserLoginForm';
import RegistForm from './components/RegistAccount';
// import { login } from 'store/actions/auth';

import './index.scss';


interface PropsHomeContent {
	url: string;
}

const HomeContent = (props: PropsHomeContent): JSX.Element => {
	const { url } = props;
	return (
		<div className="content">
			<div className="c-login">
				{/* <Link
					to={`${url}/user`}
					style={{ color: 'inherit', textDecoration: 'inherit' }}
				>
					<div className="c-userlogin">
						<p>Login with User</p>
					</div>
				</Link>
				<Link
					to={`${url}/admin`}
					style={{ color: 'inherit', textDecoration: 'inherit' }}
				>
					<div className="c-adminlogin">
						<p>Login with Admin</p>
					</div>
				</Link> */}
		<LoginForm />
		<Grid container>
			<Grid item>
				<Link to={`${url}/resetPwd`} className="resetPwd"
				style={{ color: 'inherit', textDecoration: 'none', fontSize: '18px', marginLeft: '22px' }} 
				>Forgot password?</Link>
			</Grid>
			<Grid item xs>
				<Link
				to={`${url}/signup`} className="signup"
				style={{ color: 'inherit', textDecoration: 'none', fontSize: '18px', marginRight: '0px' }}
				>Not a member? Sign up
				</Link>
			</Grid>			
		</Grid>
			 
			</div>
		</div>
	);
};

// const RegistContent = (props: PropsHomeContent): JSX.Element => {
// 	const { url } = props;
// 	return (
// 		<div className="content">
// 			<div className="c-login">						
// 				<RegistForm />
// 				<Grid container>
// 					<Grid item>
// 						<Link to={`${url}/resetPwd`} className="resetPwd"
// 						style={{ color: 'inherit', textDecoration: 'none', fontSize: '18px', marginLeft: '22px' }} 
// 						>Forgot password?</Link>
// 					</Grid>
// 					<Grid item xs>
// 						<Link
// 						to={`${url}/signup`} className="signup"
// 						style={{ color: 'inherit', textDecoration: 'none', fontSize: '18px', marginRight: '0px' }}
// 						>Not a member? Sign up
// 						</Link>
// 					</Grid>			
// 				</Grid>
			 
// 			</div>
// 		</div>
// 	);
// };

const Home = (): JSX.Element => {
	const { path, url } = useRouteMatch();

	return (
		<div className="home-container">
			<Helmet>
				<meta charSet="utf-8" />
				<title>DAT 2 | Homepage</title>
				<link rel="canonical" href="http://mysite.com/example" />
			</Helmet>
			<div className="home" style={{margin: 'auto'}}>
				<div className="c-nameapp" >
			{/* <Switch> */}
					<Link
						to={path}
						style={{ color: 'black', textDecoration: 'inherit' }}
						>
							<p id="i-homepage">Data Annotation Tool 2021</p>			
					</Link>		         	

					<Switch>
							<Route exact path={path} render={() =>  <HomeContent url={url} />} />
							<Route exact path={`${url}/resetPwd`} render={() => <Redirect to="/home" />} /> 
							<Route exact path={`${url}/signup`} render={() => <RegistForm />} /> 
					</Switch>
					
				</div>
			</div>
			
		</div>
	);
};

export default Home;
