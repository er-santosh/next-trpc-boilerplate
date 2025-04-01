import type { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormInput,
  type FormInputProps,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface InputFieldProps<T extends FieldValues> extends FormInputProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  formItemClassName?: string;
}

const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  formItemClassName,
  ...formInputProps
}: InputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={formItemClassName}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <FormInput {...formInputProps} {...field} value={field.value || ''} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default InputField;
