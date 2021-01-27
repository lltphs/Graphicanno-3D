import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AuthActionTypes,
} from 'store/types/auth';

import { User } from 'api/auth-header';

const userJson = localStorage.getItem('user');

export interface AuthStateType {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthStateType = userJson
  ? // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    { isLoggedIn: true, user: JSON.parse(userJson) }
  : { isLoggedIn: false, user: null };

export default function authReducer(
  state: AuthStateType = initialState,
  action: AuthActionTypes
): AuthStateType {
  const { type } = action;
  switch (type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case LOGIN_SUCCESS:
      if (action.payload) {
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        };
      }
      return state;
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default: {
      return state;
    }
  }
}
