import { AxiosInstance } from 'axios';

import { auth } from '@firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function interceptors(requestHTTP: AxiosInstance) {
  requestHTTP.interceptors.request.use(
    async (config) => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          config.headers = config.headers || {};
          config.headers.uid = user.uid;
        }
      });
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
      if (error.response.status === 403) {
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return requestHTTP;
}
