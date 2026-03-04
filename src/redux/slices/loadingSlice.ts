import {createSlice} from '@reduxjs/toolkit';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoadingRoot: state => {
      state.isLoading = true;
    },
    hideLoadingRoot: state => {
      state.isLoading = false;
    },
  },
});

export const {showLoadingRoot, hideLoadingRoot} = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
