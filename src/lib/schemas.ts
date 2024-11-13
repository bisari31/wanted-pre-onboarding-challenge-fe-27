import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
  password: z.string().min(8, '비밀번호가 8자리 미만입니다'),
});

export const signupSchema = z
  .object({
    email: z.string().email('이메일 형식이 올바르지 않습니다'),
    password: z.string().min(8, '비밀번호가 8자리 미만입니다'),
    confirmPassword: z.string().min(8, '비밀번호가 8자리 미만입니다'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignupSchemaType = z.infer<typeof signupSchema>;
