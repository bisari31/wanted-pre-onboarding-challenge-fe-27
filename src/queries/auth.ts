import routes from '@/lib/routes';
import authService from '@/services/authService';
import useAuthStore from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const naviagte = useNavigate();
  const login = useAuthStore((state) => state.login);
  return useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      login(data.token);
      naviagte(routes.home);
    },
  });
};

export const useLogin = () => {
  const naviagte = useNavigate();
  const login = useAuthStore((state) => state.login);
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.token);
      naviagte(routes.home);
    },
  });
};
