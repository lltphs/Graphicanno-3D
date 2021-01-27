import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { RootDispatchType } from 'store';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { logout } from 'store/actions/auth';
import * as UserServices from 'api/user';

import ChangePassword from './components/PasswordResetForm';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
    },
  })
);

interface UserDetailActionTypes {
  type: string;
  payload: string;
}

const initialUserDetail = {
  username: '',
  email: '',
};

function userDetailReducer(
  state = initialUserDetail,
  action: UserDetailActionTypes
) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USERNAME': {
      return {
        ...state,
        username: payload,
      };
    }
    case 'SET_EMAIL': {
      return {
        ...state,
        email: payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

const Home = (): JSX.Element => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch: RootDispatchType = useDispatch();

  const [userDetailState, userDetailDispatch] = useReducer(
    userDetailReducer,
    initialUserDetail
  );

  useEffect(() => {
    const loadUserDetail = async () => {
      try {
        const response = await UserServices.getUserDetail();
        userDetailDispatch({
          type: 'SET_USERNAME',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          payload: response.data.username,
        });
        userDetailDispatch({
          type: 'SET_EMAIL',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          payload: response.data.email,
        });
      } catch (error) {
        toast.error("Can't load User data!", {
          position: 'bottom-left',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        throw error;
      }
    };
    loadUserDetail();
  }, []);

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DAT 2 | Change Password</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyItems="space-between"
      >
        <Box p={0}>
          <Header
            username={userDetailState.username}
            logout={() => {
              dispatch(logout());
            }}
            changePasswordHandle={() => {
              history.push('/change_password');
            }}
            workspacesHandle={() => {
              history.push('/workspaces');
            }}
          />
        </Box>
        <Box p={0} flexGrow={1}>
          <ChangePassword />
        </Box>

        <Box p={0}>
          <Footer />
        </Box>
      </Box>
    </div>
  );
};

export default Home;
