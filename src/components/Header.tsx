import { Button } from '@/components/ui/button';
import routes from '@/lib/routes';
import useAuthStore from '@/stores/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { logout, credentials } = useAuthStore();
  const navigate = useNavigate();
  return (
    <header className="h-14">
      <nav className="flex h-full items-center justify-end">
        <ul className="flex items-center gap-2">
          {credentials ? (
            <li>
              <Button
                type="button"
                onClick={() => {
                  logout();
                  navigate(routes.login);
                }}
              >
                로그아웃
              </Button>
            </li>
          ) : (
            <>
              <li>
                <Button asChild variant={'ghost'}>
                  <Link className="flex py-4" to={routes.login}>
                    로그인
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant={'default'}>
                  <Link className="flex py-4" to={routes.signup}>
                    회원가입
                  </Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
