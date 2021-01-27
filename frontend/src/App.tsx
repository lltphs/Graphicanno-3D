import React, { ComponentType, LazyExoticComponent } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { RootStateType } from 'store';

import Fallback from 'components/common/Fallback/Fallback';

import routes from './pages/routes';

interface PropsPrivateRoute {
  key: string;
  path: string;
  exact: boolean;
  component: LazyExoticComponent<
    ComponentType | ComponentType<RouteComponentProps> | ComponentType
  >;
}

const PrivateRoute = ({
  component: Component,
  key,
  path,
  exact,
}: PropsPrivateRoute) => {
  const isLoggedIn = useSelector(
    (state: RootStateType) => state.auth.isLoggedIn
  );

  return (
    <Route
      key={key}
      path={path}
      exact={exact}
      render={(props) =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        isLoggedIn ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};

interface PropsPublicRoute {
  key: string;
  path: string;
  exact: boolean;
  component: LazyExoticComponent<
    ComponentType | ComponentType<RouteComponentProps> | ComponentType
  >;
}

const PublicRoute = ({
  component: Component,
  key,
  path,
  exact,
}: PropsPublicRoute) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isLoggedIn = useSelector(
    (state: RootStateType) => state.auth.isLoggedIn
  );

  return (
    <Route
      key={key}
      path={path}
      exact={exact}
      render={(props) =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        !isLoggedIn ? <Component {...props} /> : <Redirect to="/workspaces" />
      }
    />
  );
};

const App = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DAT 2</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <React.Suspense fallback={<Fallback />}>
        <Switch>
          {routes.map(({ component: Component, path, exact, publicPage }) => {
            if (!publicPage) {
              return (
                <PrivateRoute
                  key={path}
                  path={path}
                  component={Component}
                  exact={exact}
                />
              );
            }
            return (
              <PublicRoute
                key={path}
                path={path}
                component={Component}
                exact={exact}
              />
            );
          })}
          <Route render={() => <Redirect to="/home" />} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default App;
