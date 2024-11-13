import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@/queries/auth';
import { isAxiosError } from 'axios';
import { signupSchema, SignupSchemaType } from '@/lib/schemas';
import AuthInput from '@/components/auth/Input';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });
  const { mutate } = useSignup();

  const handleSubmitForm = (data: SignupSchemaType) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onError: (error) => {
          if (isAxiosError(error)) {
            if (error.status === 409) {
              return setError('root', { message: '이메일이 존재합니다' });
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
        <AuthInput
          {...register('confirmPassword')}
          type="password"
          placeholder="비밀번호 확인"
          message={errors.confirmPassword?.message}
        />
        <div className="flex justify-end">
          <Button asChild variant={'ghost'}>
            <Link to={'/login'}>이미 아이디가 있습니다</Link>
          </Button>
        </div>
        <p className="text-center text-sm">
          {errors.root && errors.root.message}
        </p>
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
