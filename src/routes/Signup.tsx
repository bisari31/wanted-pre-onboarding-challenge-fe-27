import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@/queries/auth';

const schema = z
  .object({
    email: z.string().email('이메일 형식이 올바르지 않습니다'),
    password: z.string().min(8, '비밀번호가 8자리 미만입니다'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type Inputs = z.infer<typeof schema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useSignup();

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
        <div className="flex flex-col gap-1">
          <Input
            {...register('confirmPassword')}
            placeholder="비밀번호 확인"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button asChild variant={'ghost'}>
            <Link to={'/login'}>이미 아이디가 있습니다</Link>
          </Button>
        </div>
        <Button
          disabled={
            !!errors.email || !!errors.password || !!errors.confirmPassword
          }
          className="mt-5"
          type="submit"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
