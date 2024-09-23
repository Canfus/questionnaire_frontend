import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Rubric } from '@app/api';

import type { Slice } from './slice.interface';
import { sliceNames } from '../slices.constants';

const initialState: Slice = {
  rubric: null,
  rubricList: [],
};

const slice = createSlice({
  name: sliceNames.rubricSlice,
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Rubric[]>) => {
      state.rubricList = action.payload;
    },
    set: (state, action: PayloadAction<Rubric>) => {
      state.rubric = action.payload;
    },
    clear: (state) => {
      state.rubricList = [];
      state.rubric = null;
    },
  },
});

const { setList, set, clear } = slice.actions;

export const rubricActions: typeof slice.actions = {
  setList,
  set,
  clear,
};

export const { reducer } = slice;
