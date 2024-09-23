import classNames from 'classnames';
import { memo } from 'react';
import { useController, type FieldValues } from 'react-hook-form';

import { RadioGroup } from '@app/common';

import type { RadioGroupFieldProps } from './radioGroupField.interface';
import styles from './radioGroupField.module.css';

const InnerComponent = <TFieldValues extends FieldValues = FieldValues>({
  className,
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  required,
  index,
  title,
  onValueChange,
  ...props
}: RadioGroupFieldProps<TFieldValues>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  const { error, invalid } = fieldState;

  const onChange = (value: string) => {
    if (onValueChange) {
      onValueChange();
    }
    field.onChange(value);
  };

  return (
    <div className={classNames(styles.field, className)}>
      <p className={styles.field__title}>
        <span>{index}. </span>
        {title}
        {required && <span className={styles.title__required}>*</span>}
      </p>
      <RadioGroup
        {...props}
        {...field}
        onValueChange={onChange}
        invalid={invalid}
      />
      {error && <p className={styles.field__error}>{error.message}</p>}
    </div>
  );
};

export const RadioGroupField = memo(InnerComponent) as typeof InnerComponent;
