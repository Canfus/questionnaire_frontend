import classNames from 'classnames';
import { forwardRef } from 'react';

import type { IconButtonProps } from './iconButton.interface';
import styles from './iconButton.module.css';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, type = 'button', ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type={type}
      className={classNames(styles.button, className)}
    >
      {icon}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
