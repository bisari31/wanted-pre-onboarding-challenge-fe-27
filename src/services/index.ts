import auth from '@/lib/auth';
import axios, { CreateAxiosDefaults } from 'axios';

const defaultConfig: CreateAxiosDefaults = {
  baseURL: 'http://localhost:8080',
  timeout: 5000,
};

export const apiRequester = axios.create({
  ...defaultConfig,
});

export const apiRequesterWithToken = axios.create({
  ...defaultConfig,
});

apiRequesterWithToken.interceptors.request.use((config) => {
  const credentials = auth.get();
  if (!credentials) {
    window.location.href = '/login';
    return config;
  }
  config.headers.Authorization = credentials;
  return config;
});

// apiRequester.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;
//     if (isAxiosError(error)) {
//       if (response.status === 401) {
//         window.location.href = '/auth';
//       }
//     }
//     return Promise.reject(error);
//   },
// );
