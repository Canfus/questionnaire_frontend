import type { FieldValues, FieldErrors } from 'react-hook-form';

export type SubmitSuccessHandler<Data extends FieldValues = FieldValues> = (
  values: Data,
) => void;

export type SubmitErrorHandler<Data extends FieldValues = FieldValues> = (
  error: FieldErrors<Data>,
) => void;
