import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useAppSelector } from '@app/common';

import { Notification } from '../notification';
import type { RootProps } from './root.interface';
import styles from './root.module.css';

export const NotificationsRoot = ({ className, ...props }: RootProps) => {
  const { notifications } = useAppSelector((store) => store.notifications);

  return createPortal(
    <motion.div {...props} className={classNames(styles.root, className)}>
      <AnimatePresence mode="sync">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
};
