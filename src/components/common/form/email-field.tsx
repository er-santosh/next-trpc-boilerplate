import type { FieldValues } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa6';

import InputField, { type InputFieldProps } from '@/components/common/form/input-field';

interface EmailFieldProps<T extends FieldValues> extends InputFieldProps<T> {}

const EmailField = <T extends FieldValues>({
  name,
  control,
  label = 'Email Address',
  ...formInputProps
}: EmailFieldProps<T>) => (
  <InputField
    name={name}
    control={control}
    label={label}
    type="email"
    startIcon={FaEnvelope}
    autoComplete="email"
    inputMode="email"
    {...formInputProps}
  />
);

export default EmailField;
