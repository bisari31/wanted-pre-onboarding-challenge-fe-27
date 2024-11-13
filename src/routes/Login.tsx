import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Link, redirect } from 'react-router-dom';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/queries/auth';
import auth from '@/lib/auth';

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
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useLogin();
  const handleSubmitForm: SubmitHandler<Inputs> = (data) => {
    mutate({ email: data.email, password: data.password });
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
