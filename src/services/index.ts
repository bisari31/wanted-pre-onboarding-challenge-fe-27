import axios, { CreateAxiosDefaults, isAxiosError } from 'axios';

const auth = {
  get: (name: string) => localStorage.getItem(name),
};

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
  const token = auth.get('token');
  if (!token) {
    window.location.href = '/auth';
    return config;
  }
  config.headers.Authorization = token;
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
