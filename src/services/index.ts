import axios, { CreateAxiosDefaults } from 'axios';

const defaultConfig: CreateAxiosDefaults = {
  baseURL: 'http://localhost:8080',
  timeout: 5000,
};

export const apiRequester = axios.create({
  ...defaultConfig,
});
