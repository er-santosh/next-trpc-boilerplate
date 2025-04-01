import { useState } from 'react';

import type { FieldValues } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa6';

import InputField, { type InputFieldProps } from '@/components/common/form/input-field';

interface PasswordFieldProps<T extends FieldValues> extends InputFieldProps<T> {}

const PasswordField = <T extends FieldValues>({
  name,
  control,
  label,
  ...formInputProps
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <InputField
      name={name}
      control={control}
      label={label}
      type={showPassword ? 'text' : 'password'}
      startIcon={FaLock}
      endIcon={showPassword ? FaEyeSlash : FaEye}
      onEndIconClick={toggleShowPassword}
      autoComplete="current-password"
      {...formInputProps}
    />
  );
};

export default PasswordField;
