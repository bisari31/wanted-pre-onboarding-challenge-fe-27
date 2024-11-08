import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import { Link } from 'react-router-dom';

export default function Header() {
  const { logout, token } = useAuthStore();
  return (
    <header className="h-14">
      <nav className="flex h-full items-center justify-end">
        <ul className="flex">
          {token ? (
            <li>
              <Button type="button" onClick={logout}>
                로그아웃
              </Button>
            </li>
          ) : (
            <li>
              <Button asChild variant={'ghost'}>
                <Link className="flex py-4" to="auth">
                  로그인
                </Link>
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
