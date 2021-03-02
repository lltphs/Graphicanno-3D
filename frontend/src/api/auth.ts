import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Store } from 'redux';
import { LOGIN_FAIL } from 'store/types/auth';

import authHeader, { axiosInstance, User } from './auth-header';

const API_URL = '/api/';

export const register: (
  username: string,
  email: string,
  password: string
) => Promise<AxiosResponse> = (username, email, password) =>{
  axiosInstance.post(`${API_URL}user/create/`, {
    username,
    email,
    password,
  });
  window.location.href = '/login';
  return Promise.reject();
}

export const login: (
  username: string,
  password: string
) => Promise<AxiosResponse> = (username, password) =>
  axiosInstance.post(`${API_URL}token/obtain/`, {
    username,
    password,
  });
  
const removeItemInLocalStorage: (item: string) => void = (item) => {
  const userJson = localStorage.getItem(item);
  if (userJson) {
    localStorage.removeItem(item);
  }
};

export const logout: () => void = () => {
  const userJson = localStorage.getItem('user');
  if (!userJson) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user: User = JSON.parse(userJson);

  axiosInstance
    .post(
      `${API_URL}token/blacklist/`,
      {
        refresh_token: user.refresh,
      },
      {
        headers: authHeader(),
      }
    )
    .finally(() => {
      removeItemInLocalStorage('user');
    });
};

export const changePassword : (
  oldPassword: string,
  newPassword: string
) => Promise<AxiosResponse> = (oldPassword, newPassword ) => 
    axiosInstance.put(
      `${API_URL}user/changepassword/`,
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
      {
        headers: authHeader(),
      }
  );

export const interceptorJWT = (store: Store): void => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { dispatch } = store;
      const originalRequest: AxiosRequestConfig = error.config;

      if (error.response) {
        if (
          error.response.status === 401 &&
          originalRequest.url === `${API_URL}token/refresh/`
        ) {
          // console.log('Pre-request is refresh token => Reload to home page!');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        if (
          error.response.data &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          error.response.data.code === 'token_not_valid' &&
          error.response.status === 401 &&
          error.response.statusText === 'Unauthorized'
        ) {
          const userJson = localStorage.getItem('user');
          if (!userJson) {
            // console.log('Refresh token not available');
            window.location.href = '/login';
            return Promise.reject(error);
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const user: User = JSON.parse(userJson);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const tokenParts = JSON.parse(atob(user.refresh.split('.')[1]));

          const now = Math.ceil(Date.now() / 1000);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (tokenParts.exp > now) {
            return axiosInstance
              .post(`${API_URL}token/refresh/`, {
                refresh: user.refresh,
              })
              .then((response: AxiosResponse) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { data } = response;
                localStorage.setItem('user', JSON.stringify(data));
                originalRequest.headers = authHeader();
                return axiosInstance(originalRequest);
              });
          }
          // console.log('Refresh token is expired', tokenParts.exp, now);
          removeItemInLocalStorage('user');
          window.location.href = '/login';
        }

        if (
          error.response.data &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          error.response.data.code === 'user_not_found' &&
          error.response.status === 401 &&
          error.response.statusText === 'Unauthorized'
        ) {
          // console.log('Not found user in database!, re-login');
          removeItemInLocalStorage('user');
          window.location.href = '/login';
        }
      } else {
        removeItemInLocalStorage('user');
        dispatch({
          type: LOGIN_FAIL,
        });
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};
