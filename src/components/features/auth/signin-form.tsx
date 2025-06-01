'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEnvelope } from 'react-icons/fa6';

import CheckboxField from '@/components/common/form/checkbox-field';
import EmailField from '@/components/common/form/email-field';
import PasswordField from '@/components/common/form/password-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import { APP_ROUTES, DEFAULT_SIGNIN_REDIRECT_ROUTE } from '@/constants/app-routes';

import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import { SignInSchema, type SignInInput } from '@/schemas/auth';

interface SignInFormProps {
  callbackUrl?: string;
}

export default function SignInForm({
  callbackUrl = DEFAULT_SIGNIN_REDIRECT_ROUTE,
}: SignInFormProps) {
  const [isLoading, setLoading] = useState(false);

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });

  const onSubmit = async (values: SignInInput) => {
    try {
      setLoading(true);

      await authClient.signIn.email(
        {
          ...values,
          rememberMe: values.remember_me,
          callbackURL: callbackUrl,
        },
        {
          onError(context) {
            const errorMessage = context.error.message || 'An unknown error occurred';

            toast.error(errorMessage);
          },
          onSuccess() {
            toast.success('Sign in successful');
          },
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailField label="Email" name="email" control={form.control} />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordField name="password" control={form.control} />
          <CheckboxField label="Remember me" name="remember_me" control={form.control} />
        </div>

        <Button type="submit" isLoading={isLoading} className={cn('w-full')}>
          <FaEnvelope className="mr-2 h-4 w-4" />
          Sign In with Email
        </Button>
      </form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href={APP_ROUTES.AUTH.SIGN_UP}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </Form>
  );
}
