'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import EmailField from '@/components/common/form/email-field';
import PasswordField from '@/components/common/form/password-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import { APP_ROUTES } from '@/constants/app-routes';

import { cn } from '@/lib/utils';

import { LoginInputSchema, type LoginInputType } from '@/schemas/auth';

interface SignInFormProps {
  callbackUrl?: string;
}

export default function SignInForm(_props: SignInFormProps) {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<LoginInputType>({
    resolver: zodResolver(LoginInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (_values: LoginInputType) => {
    try {
      setLoading(true);
      // const result = await signIn('credentials', {
      //   ...values,
      //   callbackUrl,
      //   redirect: false,
      // });

      // if (result?.error) {
      //   toast.error(result.error);
      // }

      // if (result?.ok) {
      //   window.location.href = callbackUrl;
      // }
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
        </div>

        {/* <CheckboxField label="Remember me" name="remember_me" control={form.control} /> */}
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={cn('w-full', {
            'cursor-not-allowed': isLoading,
          })}
        >
          <Mail className="mr-2 h-4 w-4" />
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
