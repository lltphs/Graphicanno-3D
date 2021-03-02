/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RootThunkType } from 'store';

import { User } from 'api/auth-header';
import * as AuthService from 'api/auth';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types/auth';
import { SET_MESSAGE } from '../types/message';

export const register = (
  username: string,
  email: string,
  password: string
): RootThunkType => async (dispatch) => {
  try {
    const response = await AuthService.register(username, email, password);
    dispatch({
      type: REGISTER_SUCCESS,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
  }
};

export const login = (
  username: string,
  password: string
): RootThunkType => async (dispatch) => {
  try {
    const response = await AuthService.login(username, password);
    if (response.data && response.data.access && response.data.refresh) {
      const dataUser: User = response.data;

      if (dataUser && dataUser.access) {
        localStorage.setItem('user', JSON.stringify(dataUser));
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: dataUser,
      });
    } else {
      const message = response && response.data && response.data.messages;

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
  }
};

export const logout = (): RootThunkType => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
