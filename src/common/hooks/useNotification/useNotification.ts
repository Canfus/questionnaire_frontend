import { useCallback } from 'react';

import { useAppDispatch, notifications, getId } from '@app/common';

import type { Notification, NotificationId } from './useNotification.interface';
import { TIMER_AUTO_CLOSE } from './useNotification.constants';

export const useNotification = () => {
  const dispatch = useAppDispatch();
  const { append, remove } = notifications;

  const callNotification = useCallback(
    (props: Omit<Notification, 'id'>) => {
      const uniqueId = getId();

      dispatch(
        append({
          ...props,
          id: uniqueId,
        }),
      );

      const timeoutId = setTimeout(() => {
        dispatch(remove(uniqueId));
        clearTimeout(timeoutId);
      }, props.timerAutoClose || TIMER_AUTO_CLOSE);
    },
    [append, dispatch, remove],
  );

  const closeNotification = useCallback(
    (id: NotificationId) => {
      dispatch(remove(id));
    },
    [dispatch, remove],
  );

  return {
    callNotification,
    closeNotification,
  };
};
