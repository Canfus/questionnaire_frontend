import classNames from 'classnames';
import { forwardRef } from 'react';

import type { InputProps } from './input.interface';
import styles from './input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid = false, className, readOnly, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      readOnly={readOnly}
      className={classNames(
        styles.input,
        {
          [styles['input--invalid']]: invalid,
          [styles['input--readonly']]: readOnly,
        },
        className,
      )}
    />
  ),
);
Input.displayName = 'Input';
