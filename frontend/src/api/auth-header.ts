import axios from 'axios';
import { API_SERVER } from 'configs/api-server';

export interface User {
  access: string;
  refresh: string;
}

interface HeaderTypes {
  Authorization: string | null;
  'Content-Type': string;
  accept: string;
}

export const API_URL = API_SERVER;

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default function authHeader(): HeaderTypes {
  const userJson = localStorage.getItem('user');
  if (userJson === null) {
    return {
      Authorization: null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user: User = JSON.parse(userJson);

  if (user && user.access) {
    return {
      Authorization: `JWT ${user.access}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
  }
  return {
    Authorization: null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  };
}
