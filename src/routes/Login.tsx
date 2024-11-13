import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Link, redirect } from 'react-router-dom';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/queries/auth';
import auth from '@/lib/auth';
import { isAxiosError } from 'axios';

const schema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
  password: z.string().min(8, '비밀번호가 8자리 미만입니다'),
});

type Inputs = z.infer<typeof schema>;

export const loader = () => {
  if (auth.get()) return redirect('/');
  return null;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useLogin();
  const handleSubmitForm: SubmitHandler<Inputs> = ({ email, password }) => {
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
        <div className="flex flex-col gap-1">
          <Input {...register('email')} placeholder="이메일" type="email" />
          {errors.email && (
            <p className="text-sm text-red-500"> {errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            {...register('password')}
            placeholder="비밀번호"
            type="password"
          />
          {errors.password && (
            <p className="text-sm text-red-500"> {errors.password.message}</p>
          )}
        </div>
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
