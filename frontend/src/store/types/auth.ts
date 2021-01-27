import { User } from 'api/auth-header';
import { Dispatch } from 'redux';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload?: undefined;
}

interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
  payload?: undefined;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload?: undefined;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload?: undefined;
}

export type AuthActionTypes =
  | RegisterSuccessAction
  | RegisterFailAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction;

export type AuthActionFunction = (
  dispatch: Dispatch<AuthActionTypes>
) => void | Promise<void>;
