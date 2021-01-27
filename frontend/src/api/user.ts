import { AxiosResponse } from 'axios';
import type { SettingsStateType } from 'store/reducers/settings';
import authHeader, { axiosInstance } from './auth-header';

const API_URL = '/api/';

export const getUserDetail = (): Promise<AxiosResponse> =>
  axiosInstance.get(`${API_URL}user/detail/`, { headers: authHeader() });

export const getUserSettings = (): Promise<AxiosResponse> =>
  axiosInstance.get(`${API_URL}annotations/settings/`, {
    headers: authHeader(),
  });

export const setUserSettings = (
  settings:
    | SettingsStateType
    | {
        [key: string]: number | boolean;
      }
): Promise<AxiosResponse> =>
  axiosInstance.post(
    `${API_URL}annotations/settings/`,
    JSON.stringify(settings),
    {
      headers: authHeader(),
    }
  );
