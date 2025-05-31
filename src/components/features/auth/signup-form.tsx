'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEnvelope } from 'react-icons/fa6';

import EmailField from '@/components/common/form/email-field';
import InputField from '@/components/common/form/input-field';
import PasswordField from '@/components/common/form/password-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import { APP_ROUTES, DEFAULT_SIGNUP_REDIRECT_ROUTE } from '@/constants/app-routes';

import { authClient } from '@/lib/auth-client';

import { SignUpSchema, type SignUpInput } from '@/schemas/auth';

interface SignUpFormProps {
  callbackUrl?: string;
}

export default function SignUpForm({
  callbackUrl = DEFAULT_SIGNUP_REDIRECT_ROUTE,
}: SignUpFormProps) {
  const [isLoading, setLoading] = useState(false);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignUpInput) => {
    try {
      setLoading(true);

      await authClient.signUp.email(
        {
          ...values,
          callbackURL: callbackUrl,
        },
        {
          onError(context) {
            const errorMessage = context.error.message || 'An unknown error occurred';

            toast.error(errorMessage);
          },
          onSuccess() {
            toast.success('Account created successfully!');
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
        <InputField label="Full Name" name="name" control={form.control} />

        <EmailField label="Email" name="email" control={form.control} />

        <PasswordField label="Password" name="password" control={form.control} />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms_and_conditions" />
          <Label
            htmlFor="terms_and_conditions"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree the <Link href={'#'}>terms and conditions</Link>
          </Label>
        </div>

        <Button isLoading={isLoading} type="submit" className="w-full">
          <FaEnvelope className="mr-2 h-4 w-4" />
          Create an account
        </Button>
      </form>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link
          href={APP_ROUTES.AUTH.SIGN_IN}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign In
        </Link>
      </div>
    </Form>
  );
}
