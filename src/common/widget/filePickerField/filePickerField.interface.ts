import type {
  Control,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import type { FilePickerProps } from '@app/common';

export type FilePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  FilePickerProps & {
    control: Control<TFieldValues>;
  };
