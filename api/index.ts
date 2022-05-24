import axios, { AxiosInstance } from 'axios';
import { interceptors } from './interceptor';

const AxiosConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  headers: {
    'Cache-Control': 'no-cache',
    pragma: 'no-cache',
  },
};

const createAxiosWithGuest = (): AxiosInstance => {
  return axios.create(AxiosConfig);
};

const createAxiosWithUser = (): AxiosInstance => {
  const requestHTTP = axios.create(AxiosConfig);
  return interceptors(requestHTTP);
};

// Guest
export const axiosService = createAxiosWithGuest();

// User
export const axiosWithToken = createAxiosWithUser();
