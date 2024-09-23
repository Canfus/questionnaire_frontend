import classNames from 'classnames';
import { memo } from 'react';
import { useController, type FieldValues } from 'react-hook-form';

import { Select } from '@app/common';

import type { SelectFieldProps } from './selectField.interface';
import styles from './selectField.module.css';

const InnerComponent = <TFieldValues extends FieldValues = FieldValues>({
  className,
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  options,
  ...props
}: SelectFieldProps<TFieldValues>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  const { value, onChange } = field;
  const { error, invalid } = fieldState;

  return (
    <div className={classNames(styles.field, className)}>
      <Select
        {...props}
        {...field}
        invalid={invalid}
        options={options}
        value={options.find((option) => option.value === value)}
        onValueChange={(option) => onChange(option.value)}
      />
      {error && <p className={styles.field__error}>{error.message}</p>}
    </div>
  );
};

export const SelectField = memo(InnerComponent) as typeof InnerComponent;
