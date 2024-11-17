import { Button } from '@/components/ui/button';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { signupSchema, SignupSchemaType } from '@/lib/schemas';
import AuthInput from '@/components/auth/Input';
import routes from '@/lib/routes';
import { useMutation } from '@tanstack/react-query';
import authService from '@/services/authService';
import useAuthStore from '@/stores/useAuthStore';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const { mutate } = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      login(data.token);
      navigate(routes.home);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.status === 409) {
          setError('root', { message: '이메일이 존재합니다' });
        } else {
          setError('root', {
            message: '서버 오류 발생',
          });
        }
      }
    },
  });

  const handleSubmitForm = (data: SignupSchemaType) => {
    mutate({ email: data.email, password: data.password });
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
            <Link to={routes.login}>이미 아이디가 있습니다</Link>
          </Button>
        </div>
        <p className="text-center text-sm">
          {errors.root && errors.root.message}
        </p>
        <Button disabled={!isValid} className="mt-5" type="submit">
          회원가입
        </Button>
      </form>
    </div>
  );
}
