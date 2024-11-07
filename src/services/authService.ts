import { apiRequester } from '@/services';

const authService = {
  signup: async (form: { email: string; password: string }) => {
    const { data } = await apiRequester.post<Auth>('/users/create', form);
    return data;
  },
  login: async (form: { email: string; password: string }) => {
    const { data } = await apiRequester.post<Auth>('/users/login', form);
    return data;
  },
};

export default authService;
