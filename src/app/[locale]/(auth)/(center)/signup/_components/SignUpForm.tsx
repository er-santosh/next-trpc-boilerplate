'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import EmailField from '@/components/common/form/email-field';
import InputField from '@/components/common/form/input-field';
import PasswordField from '@/components/common/form/password-field';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

import { APP_ROUTES } from '@/constants/app-routes';

import { useRouter } from '@/i18n/navigation';

import { api } from '@/trpc/client';

import { RegisterInputSchema, type RegisterInputType } from '@/schemas/auth';

interface SignUpFormProps {
  callbackUrl?: string;
}

export default function SignUpForm({ callbackUrl = APP_ROUTES.DASHBOARD }: SignUpFormProps) {
  const router = useRouter();
  const form = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterInputSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const { mutate } = api.auth.signUp.useMutation({
    onSuccess() {
      router.push(`${APP_ROUTES.AUTH.SIGN_IN}?callbackUrl=${callbackUrl}`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: RegisterInputType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-2">
          <InputField label="First Name" name="first_name" control={form.control} />

          <InputField label="Last Name" name="last_name" control={form.control} />
        </div>
        <EmailField label="Email" name="email" control={form.control} />

        <PasswordField name="password" control={form.control} />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms_and_conditions" />
          <Label
            htmlFor="terms_and_conditions"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree the <Link href={'#'}>terms and conditions</Link>
          </Label>
        </div>

        <Button type="submit" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
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
