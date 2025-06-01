'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa6';

import EmailField from '@/components/common/form/email-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { APP_ROUTES } from '@/constants/app-routes';

import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import { ForgotPasswordSchema, type ForgotPasswordInput } from '@/schemas/auth';

export default function ForgotPasswordForm() {
  const [isLoading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordInput) => {
    try {
      setLoading(true);

      await authClient.forgetPassword(
        {
          ...values,
          redirectTo: APP_ROUTES.AUTH.RESET_PASSWORD,
        },
        {
          onError(context) {
            const errorMessage = context.error.message || 'An unknown error occurred';

            toast.error(errorMessage);
          },
          onSuccess() {
            toast.success('Reset link sent to your email address. Please check your inbox.');
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

        <Button type="submit" isLoading={isLoading} className={cn('w-full')}>
          <FaEnvelope className="mr-2 h-4 w-4" />
          Send Reset Link
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link
          href={APP_ROUTES.AUTH.SIGN_IN}
          className="font-medium text-primary underline-offset-4 inline-flex items-center gap-2 hover:underline"
        >
          <FaArrowLeft />
          Back to Login
        </Link>
      </div>
    </Form>
  );
}
