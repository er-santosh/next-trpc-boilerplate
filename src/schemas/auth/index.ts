import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
  remember_me: z.boolean().optional(),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const SignUpSchema = SignInSchema.extend({
  name: z.string().min(1, 'Full Name is required'),
  agree_to_terms: z.boolean().refine(value => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).omit({
  remember_me: true,
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
