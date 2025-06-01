'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import PasswordField from '@/components/common/form/password-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { APP_ROUTES } from '@/constants/app-routes';

import { useRouter } from '@/i18n/navigation';

import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import { ResetPasswordSchema, type ResetPasswordInput } from '@/schemas/auth';

interface ResetPasswordFormProps {
  token?: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordInput>({
    mode: 'all',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit = async (values: ResetPasswordInput) => {
    try {
      setLoading(true);

      await authClient.resetPassword(
        {
          newPassword: values.password,
          token,
        },
        {
          onError(context) {
            const errorMessage = context.error.message || 'An unknown error occurred';

            toast.error(errorMessage);
          },
          onSuccess() {
            toast.success('Password reset successfully!');

            router.replace(APP_ROUTES.AUTH.SIGN_IN);
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
        <PasswordField label="Password" name="password" control={form.control} />
        <PasswordField label="Confirm Password" name="confirm_password" control={form.control} />

        <Button type="submit" isLoading={isLoading} className={cn('w-full')}>
          Reset
        </Button>
      </form>
    </Form>
  );
}
