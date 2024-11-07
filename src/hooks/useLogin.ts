import { useLogin, useSignup } from '@/queries/auth';
import { useState } from 'react';
import { z } from 'zod';
type Form = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INIT_FORM: Form = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const schema = z.object({
  email: z.string().email('이메일이 유효하지 않습니다.'),
  password: z.string().min(8, '비밀번호가 8자리 미만입니다.'),
});

export default function useLoginForm(currentPage: 'login' | 'signup') {
  const [form, setForm] = useState<Form>(INIT_FORM);
  const [isValid, setIsValid] = useState(false);

  const { mutate: signupMutate } = useSignup();
  const { mutate: loginMutate } = useLogin();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const newForm: Form = { ...form, [name]: value };
    setForm(newForm);
    setIsValid(validateForm(newForm));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentPage === 'login')
      return loginMutate({ email: form.email, password: form.password });
    signupMutate({ email: form.email, password: form.password });
  };

  const validateForm = (form: Form) => {
    const { email, password, passwordConfirm } = form;
    if (currentPage === 'login') {
      if (!email.length || !password.length) return false;
      if (password.length < 8) return false;
      return EMAIL_REGEX.test(email);
    } else {
      console.log(form);
      if (!email.length || !password.length || !passwordConfirm.length)
        return false;
      if (password.length < 8) return false;
      return EMAIL_REGEX.test(email) && password === passwordConfirm;
    }
  };

  const resetForm = () => {
    setForm(INIT_FORM);
    setIsValid(false);
  };

  return { form, handleChange, resetForm, isValid, handleSubmit };
}
