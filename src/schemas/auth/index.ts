import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const SignUpSchema = SignInSchema.extend({
  name: z.string().min(1, 'Full Name is required'),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
