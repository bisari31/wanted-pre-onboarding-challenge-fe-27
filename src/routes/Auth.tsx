import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLoginForm from '@/hooks/useLogin';
import useAuthStore from '@/stores/useAuthStore';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Auth() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');
  const { handleChange, handleSubmit, form, resetForm, isValid } =
    useLoginForm(currentPage);
  const token = useAuthStore((state) => state.token);

  if (token) return <Navigate to={'/'} />;

  return (
    <div className="flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-80 flex-col gap-2"
      >
        <Input
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          type="email"
          name="email"
        />
        <Input
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          type="password"
          name="password"
        />
        {currentPage === 'signup' && (
          <Input
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호 확인"
            type="password"
            name="passwordConfirm"
          />
        )}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => {
              setCurrentPage((prev) => (prev === 'login' ? 'signup' : 'login'));
              resetForm();
            }}
            variant={'ghost'}
          >
            {currentPage === 'login'
              ? '아이디가 없습니다'
              : '이미 아이디가 있습니다'}
          </Button>
        </div>
        <Button disabled={!isValid} className="mt-5" type="submit">
          {currentPage === 'login' ? '로그인' : '회원가입'}
        </Button>
      </form>
    </div>
  );
}
