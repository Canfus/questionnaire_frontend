import type {
  Control,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import type { MapProps } from '@app/common';

export type MapFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  MapProps & {
    control: Control<TFieldValues>;
  };
