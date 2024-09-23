import type {
  Control,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import type { RadioGroupProps } from '@app/common';

export type RadioGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  Omit<RadioGroupProps, 'onValueChange'> & {
    control: Control<TFieldValues>;
    title: string;
    index: number;
    onValueChange?: () => void;
  };
