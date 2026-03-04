import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const initialState = {
  isSearchBoxShow: false,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    toggleInventorySearchBox: state => {
      return {
        ...state,
        isSearchBoxShow: !state.isSearchBoxShow,
      };
    },
    hideInventorySearchBox: state => {
      return {
        ...state,
        isSearchBoxShow: false,
      };
    },
  },
});

export const {toggleInventorySearchBox, hideInventorySearchBox} =
  inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;

export const isSearchBoxShow = () => {
  return useSelector((store: RootState) => store.inventory.isSearchBoxShow);
};
