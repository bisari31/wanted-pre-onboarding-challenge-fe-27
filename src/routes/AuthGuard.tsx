import useAuthStore from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    alert('로그인 페이지로 이동됩니다.');
    return <Navigate to={'/auth'} />;
  }

  return <Outlet />;
}
