import type { Control, FieldValues, Path } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

import { cn } from '@/lib/utils';

export interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

const CheckboxField = <T extends FieldValues>({ name, control, label }: CheckboxFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem
        className={cn('flex flex-row items-center space-x-2 space-y-0', {
          'space-x-0': !label,
        })}
      >
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        {label && <FormLabel>{label}</FormLabel>}
      </FormItem>
    )}
  />
);

export default CheckboxField;
