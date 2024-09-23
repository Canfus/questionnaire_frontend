import classNames from 'classnames';
import { forwardRef } from 'react';
import { Root, Portal, Content } from '@radix-ui/react-dialog';

import type { DialogProps } from './dialog.interface';
import styles from './dialog.module.css';

export const DialogPrimitive = forwardRef<HTMLDivElement, DialogProps>(
  ({ container, className, children, modal = false, ...props }, ref) => (
    <Root {...props} modal={modal}>
      <Portal container={container}>
        <div
          className={classNames(styles.dialog__overlay, {
            [styles['dialog__overlay--modal']]: modal,
          })}
        />
        <Content
          ref={ref}
          className={classNames(
            styles.dialog__content,
            {
              [styles['dialog__content--modal']]: modal,
            },
            className,
          )}
        >
          {children}
        </Content>
      </Portal>
    </Root>
  ),
);
DialogPrimitive.displayName = 'Dialog';
