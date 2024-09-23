import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Notification, NotificationId } from '@app/common';

import type { SliceProps } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: SliceProps = {
  notifications: [],
};

const slice = createSlice({
  name: sliceNames.notificationSlice,
  initialState,
  reducers: {
    append: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    remove: (state, action: PayloadAction<NotificationId>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

const { append, remove } = slice.actions;

export const notifications: typeof slice.actions = {
  append,
  remove,
};

export const { reducer } = slice;
