import { forwardRef } from 'react';

import { DialogPrimitive, IconButton, CloseIcon } from '@app/common';

import type { DialogProps } from './dialog.interface';
import styles from './dialog.module.css';
import classNames from 'classnames';

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ className, children, title, onOpenChange, ...props }, ref) => (
    <DialogPrimitive
      {...props}
      ref={ref}
      onOpenChange={onOpenChange}
      className={styles.dialog__wrapper}
      modal
    >
      <div className={styles.dialog__header}>
        <h2 className={styles.dialog__title}>{title}</h2>
        <IconButton
          icon={<CloseIcon />}
          className={styles.dialog__close}
          onClick={onOpenChange}
        />
      </div>
      <div className={classNames(styles.dialog__content, className)}>
        {children}
      </div>
    </DialogPrimitive>
  ),
);
Dialog.displayName = 'Dialog';
