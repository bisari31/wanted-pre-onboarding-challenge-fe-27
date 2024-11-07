import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import { Link } from 'react-router-dom';

export default function Header() {
  const { logout, token } = useAuthStore();
  return (
    <header>
      <nav className="flex items-center">
        <ul className="flex flex-1">
          <li className="">
            <Link className="flex py-4" to={'/'}>
              홈
            </Link>
          </li>
        </ul>
        <ul className="flex">
          {token ? (
            <li>
              <Button type="button" onClick={logout}>
                로그아웃
              </Button>
            </li>
          ) : (
            <li>
              <Link className="flex py-4" to="auth">
                로그인
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
