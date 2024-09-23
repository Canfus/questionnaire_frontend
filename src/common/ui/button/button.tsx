import classNames from 'classnames';
import { forwardRef } from 'react';

import type { ButtonProps } from './button.interface';
import styles from './button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      priority = false,
      className,
      type = 'submit',
      ...props
    },
    ref,
  ) => (
    <button
      {...props}
      ref={ref}
      type={type}
      className={classNames(
        styles.button,
        {
          [styles['button--primary']]: variant === 'primary',
          [styles['button--secondary']]: variant === 'secondary',
          [styles['button--medium']]: size === 'medium',
          [styles['button--large']]: size === 'large',
          [styles['button--priority']]: priority,
        },
        className,
      )}
    />
  ),
);
Button.displayName = 'Button';
