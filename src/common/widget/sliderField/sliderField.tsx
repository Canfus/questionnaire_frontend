import { memo } from 'react';
import { useController, type FieldValues } from 'react-hook-form';

import { Slider } from '@app/common';

import type { SliderFieldProps } from './sliderField.interface';
import styles from './sliderField.module.css';

const InnerComponent = <TFieldValues extends FieldValues = FieldValues>({
  className,
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  title,
  ...props
}: SliderFieldProps<TFieldValues>) => {
  const { field } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  const { onChange } = field;

  return (
    <div className={styles.field}>
      <span className={styles.field__title}>{title}</span>
      <Slider
        {...props}
        {...field}
        onValueChange={(value) => onChange(value)}
        className={className}
      />
    </div>
  );
};

export const SliderField = memo(InnerComponent) as typeof InnerComponent;
