import {createSlice} from '@reduxjs/toolkit';

export interface InfiniteState {}

const initialState: InfiniteState = {};

export const infiniteSlice = createSlice({
  name: 'infinite',
  initialState,
  reducers: {
    init: (state, action) => {},
  },
});

export const {init} = infiniteSlice.actions;

export const infiniteReducer = infiniteSlice.reducer;
