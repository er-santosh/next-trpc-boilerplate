import { z } from 'zod';

export const LoginInputSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInputType = z.infer<typeof LoginInputSchema>;

export const RegisterInputSchema = LoginInputSchema.extend({
  first_name: z.string().min(1, 'First Name is required'),
  last_name: z.string().min(1, 'Last Name is required'),
});

export type RegisterInputType = z.infer<typeof RegisterInputSchema>;
