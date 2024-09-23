import classNames from 'classnames';
import { memo } from 'react';
import { useController, type FieldValues } from 'react-hook-form';
import type { LatLng } from 'leaflet';

import { Map } from '@app/common';

import type { MapFieldProps } from './mapField.interface';
import styles from './mapField.module.css';

const InnerComponent = <TFieldValues extends FieldValues = FieldValues>({
  className,
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...props
}: MapFieldProps<TFieldValues>) => {
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

  const onPositionChange = (position: LatLng) => {
    onChange(position);
  };

  return (
    <div className={classNames(styles.field, className)}>
      <Map
        {...props}
        position={value}
        setPosition={onPositionChange}
        withSearchParams
        invalid={invalid}
        className={classNames({
          [styles['field--invalid']]: invalid,
        })}
      />
      {error && <p className={styles.field__error}>{error.message}</p>}
    </div>
  );
};

export const MapField = memo(InnerComponent) as typeof InnerComponent;
