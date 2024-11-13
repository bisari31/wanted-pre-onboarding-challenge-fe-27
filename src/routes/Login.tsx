import { Button } from '@/components/ui/button';

import { Link, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/queries/auth';
import auth from '@/lib/auth';
import { isAxiosError } from 'axios';
import AuthInput from '@/components/auth/Input';
import { LoginSchemaType, loginSchema } from '@/lib/schemas';

export const loader = () => {
  if (auth.get()) return redirect('/');
  return null;
};

export default function Login() {
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate } = useLogin();
  const handleSubmitForm = ({ email, password }: LoginSchemaType) => {
    mutate(
      { email, password },
      {
        onError: (err) => {
          if (isAxiosError(err)) {
            if (err.status === 400) {
              return setError('root', {
                message: '아이디 또는 비밀번호가 일치하지 않습니다',
              });
            }
            return setError('root', {
              message: '서버 오류 발생',
            });
          }
        },
      },
    );
  };
  return (
    <div className="flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex w-full max-w-80 flex-col gap-2"
      >
        <AuthInput
          {...register('email')}
          type="email"
          placeholder="이메일"
          message={errors.email?.message}
        />
        <AuthInput
          {...register('password')}
          type="password"
          placeholder="비밀번호"
          message={errors.password?.message}
        />
        <div className="flex justify-end">
          <Button asChild variant={'ghost'}>
            <Link to={'/signup'}>아이디가 없습니다</Link>
          </Button>
        </div>
        <p className="text-center text-sm">
          {errors.root && errors.root.message}
        </p>
        <Button
          disabled={!!errors.email || !!errors.password}
          className="mt-5"
          type="submit"
        >
          로그인
        </Button>
      </form>
    </div>
  );
}
