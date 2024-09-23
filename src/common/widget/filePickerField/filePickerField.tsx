import { memo } from 'react';
import { useController, type FieldValues } from 'react-hook-form';

import { FilePicker } from '@app/common';

import type { FilePickerFieldProps } from './filePickerField.interface';

const InnerComponent = <TFieldValues extends FieldValues = FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
}: FilePickerFieldProps<TFieldValues>) => {
  const { field } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  const { onChange } = field;

  return <FilePicker onPick={onChange} />;
};

export const FilePickerField = memo(InnerComponent) as typeof InnerComponent;
