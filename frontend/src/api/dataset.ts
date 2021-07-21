import { AxiosResponse } from 'axios';
import { useLoader } from '@react-three/fiber';
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';

import authHeader, { axiosInstance } from './auth-header';

const API_URL = '/api/dataset/';

export const getDatasetList = (): Promise<AxiosResponse> =>
  axiosInstance.get(`${API_URL}`, { headers: authHeader() });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDataset = (id: string): any =>
{ 
  return useLoader(NRRDLoader, `http://localhost${API_URL}${id}/` , (loader) => {
    loader.setRequestHeader({Authorization: authHeader().Authorization})
  });
}

export const uploadDataset = (file): Promise<AxiosResponse> =>{
  const formdata = new FormData()
  formdata.append('Content-Type', 'multipart/form-data');
  for (let i = 0; i < file.length; i += 1) {
    formdata.append('file', file[i])
  }
  const headers = {
    Authorization: authHeader().Authorization,
  }
  return axiosInstance.post(`${API_URL}`, formdata, { headers });
}

export const deleteDataset = (id: string): Promise<AxiosResponse> =>
  axiosInstance.delete(`${API_URL}${id}/`, { headers: authHeader() });

export const updateAnnotation = (id: string, annotation: object): Promise<AxiosResponse> =>
  axiosInstance.post(`${API_URL}${id}/annotation/`, annotation,{ headers: authHeader()});

export const inviteMembers = (id: string, usernameInput: object): Promise<AxiosResponse> =>
  axiosInstance.post(`${API_URL}${id}/invite/`, { username_list: usernameInput } ,{ headers: authHeader()});

export const getAnnotation = (id: string): any => { 
  return useLoader(NRRDLoader, `http://localhost${API_URL}${id}/annotation/` , (loader) => {
    loader.setRequestHeader({Authorization: authHeader().Authorization})
  });
}