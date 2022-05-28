import { AxiosInstance } from 'axios';

export function interceptors(requestHTTP: AxiosInstance) {
  requestHTTP.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  requestHTTP.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return requestHTTP;
}
