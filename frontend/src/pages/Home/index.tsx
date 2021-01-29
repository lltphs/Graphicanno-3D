import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import LoginWithAdmin from './components/AdminLoginForm';
import LoginForm from './components/UserLoginForm';

import './index.scss';

interface PropsHomeContent {
  url: string;
}

const HomeContent = (props: PropsHomeContent): JSX.Element => {
  const { url } = props;
  return (
    <div className="content">
      <div className="c-login">
        <Link
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
        </Link>
      </div>
    </div>
  );
};

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
        <div className="c-nameapp">
          <Link
            to={path}
            style={{ color: 'black', textDecoration: 'inherit' }}
          >
            <p id="i-homepage">Data Annotation Tool 2021</p>
            <Switch>
              <Route exact path={path} render={() => <HomeContent url={url} />} />
              <Route exact path={`${path}/user`} render={() => <LoginForm />} />
              <Route exact path={`${path}/admin`} render={() => <LoginWithAdmin />} />
            </Switch>
          </Link>
        </div>
      </div>
      {/* <Switch>
        <Route exact path={path} render={() => <HomeContent url={url} />} />
        <Route exact path={`${path}/user`} render={() => <LoginForm />} />
        <Route exact path={`${path}/admin`} render={() => <LoginWithAdmin />} />
      </Switch> */}
    </div>
  );
};

export default Home;
