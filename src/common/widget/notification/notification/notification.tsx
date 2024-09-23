import classNames from 'classnames';
import { forwardRef, useMemo, type JSX } from 'react';
import { motion } from 'framer-motion';

import { useNotification } from '@app/common';

import type { NotificationProps } from './notification.interface';
import styles from './notification.module.css';

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ notification, ...props }, ref) => {
    const { closeNotification } = useNotification();
    const { id, type, title, content } = notification;

    const onCloseNotification = () => {
      closeNotification(id);
    };

    const render = useMemo<JSX.Element | null>(() => {
      switch (type) {
        case 'success':
          return (
            <>
              <p className={styles.content__title}>{title || 'Успешно'}</p>
              <div className={styles.content__description}>{content}</div>
            </>
          );
        case 'error':
          return (
            <>
              <p className={styles.content__title}>
                {title || 'Произошла ошибка'}
              </p>
              <div className={styles.content__description}>{content}</div>
            </>
          );
        case 'custom':
          return (
            <>
              <p className={styles.content__title}>
                {title || 'Подтвердите действие'}
              </p>
              <div className={styles.content__description}>{content}</div>
            </>
          );
        default:
          return (
            <>
              <p className={styles.content__title}>{title || 'Уведомление'}</p>
              <div className={styles.content__description}>{content}</div>
            </>
          );
      }
    }, [content, title, type]);

    return (
      <motion.div
        {...props}
        ref={ref}
        layout
        transition={{ type: 'spring', bounce: 0.3, velocity: 2 }}
        animate={{ transform: 'translateX(0)' }}
        exit={{ transform: 'translateX(120%)' }}
        className={classNames(styles.notification, {
          [styles['notification--error']]: type === 'error',
        })}
        role="alert"
        aria-hidden
        onClick={onCloseNotification}
      >
        {render}
      </motion.div>
    );
  },
);
Notification.displayName = 'Notification';
