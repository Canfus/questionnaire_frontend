import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Idea } from '@app/api';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  ideaList: [],
};

const slice = createSlice({
  name: sliceNames.ideaListSlice,
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Idea[]>) => {
      state.ideaList = action.payload;
    },
    clear: (state) => {
      state.ideaList = [];
    },
  },
});

const { set, clear } = slice.actions;

export const ideaListActions: typeof slice.actions = {
  set,
  clear,
};

export const { reducer } = slice;
