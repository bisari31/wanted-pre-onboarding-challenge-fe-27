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

export const todoFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  priority: z.enum(['urgent', 'normal', 'low']).refine((val) => !!val),
});

export type TodoFormType = z.infer<typeof todoFormSchema>;
export type Priority = z.infer<typeof todoFormSchema>['priority'];

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignupSchemaType = z.infer<typeof signupSchema>;
