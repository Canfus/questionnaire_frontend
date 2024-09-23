import type {
  Control,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import type { InputProps } from '@app/common';

export type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  InputProps & {
    control: Control<TFieldValues>;
    limit?: number;
    customError?: string;
    extraOnChange?: () => void;
  };
