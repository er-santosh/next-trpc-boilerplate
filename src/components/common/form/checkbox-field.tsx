import type { Control, FieldValues, Path } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

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
      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <FormLabel>{label}</FormLabel>
      </FormItem>
    )}
  />
);

export default CheckboxField;
