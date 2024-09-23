import {
  Control,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

import type { SliderProps } from '@app/common';

export type SliderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> &
  SliderProps & {
    control: Control<TFieldValues>;
    title: string;
  };
