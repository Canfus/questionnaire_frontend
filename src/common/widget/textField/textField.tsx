import classNames from 'classnames';
import { memo, ChangeEvent } from 'react';
import { useController, type FieldValues } from 'react-hook-form';

import { Input } from '@app/common';

import type { TextFieldProps } from './textField.interface';
import styles from './textField.module.css';

const InnerComponent = <TFieldValues extends FieldValues = FieldValues>({
  className,
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  limit,
  customError,
  extraOnChange,
  ...props
}: TextFieldProps<TFieldValues>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  const { onChange } = field;
  const { error, invalid } = fieldState;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (limit && value.length > limit) {
      return;
    }
    onChange(value);
    if (extraOnChange) {
      extraOnChange();
    }
  };

  return (
    <div className={classNames(styles.field, className)}>
      <Input
        {...props}
        {...field}
        onChange={onChangeHandler}
        invalid={invalid}
      />
      {error && (
        <p className={styles.field__error}>{customError || error.message}</p>
      )}
    </div>
  );
};

export const TextField = memo(InnerComponent) as typeof InnerComponent;
