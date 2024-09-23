import { configureStore } from '@reduxjs/toolkit';

import { rubricReducer, notificationsReducer, ideaListReducer } from './slices';

export const store = configureStore({
  reducer: {
    rubric: rubricReducer,
    notifications: notificationsReducer,
    ideaList: ideaListReducer,
  },
});
