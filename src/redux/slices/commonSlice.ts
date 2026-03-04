import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const initialState: any = {
  chartData: [],
  parentCategory: [],
  subCategory: [],
  parentCategoryIcon: [],
  needToReload: false,
  notiUnreadCount: 0,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    getChartDataById: (state, action) => {},
    setChartData: (state, action) => {
      return {
        ...state,
        chartData: action.payload,
      };
    },
    getProductByCategory: (state, action) => {},
    getParentCategory: () => {},
    createCategory: (state, action) => {},
    createSubCategory: (state, action) => {},
    setParentCategory: (state, action) => {
      return {
        ...state,
        parentCategory: action.payload,
      };
    },
    updateCategory: (state, action) => {
      return {
        ...state,
        parentCategory: [...state.parentCategory, action.payload],
      };
    },
    updateSubCategory: (state, action) => {
      return {
        ...state,
        subCategory: [...state.subCategory, action.payload],
      };
    },
    createProduct: (state, action) => {},
    updateProduct: (state, action) => {},
    getBarcodeProduct: (state, action) => {},
    attemptCheckout: (state, action) => {},
    attemptSuspend: (state, action) => {},
    deleteSuspend: (state, action) => {},
    getParentCategoryIcon: (state, action) => {},
    setParentCategoryIcon: (state, action) => {
      return {
        ...state,
        parentCategoryIcon: action.payload,
      };
    },
    setNotiUnreadCount: (state, action) => {
      return {
        ...state,
        notiUnreadCount: action.payload,
      };
    },
  },
});

export const {
  getChartDataById,
  getProductByCategory,
  getParentCategory,
  createCategory,
  createSubCategory,
  setParentCategory,
  updateCategory,
  updateSubCategory,
  createProduct,
  updateProduct,
  getBarcodeProduct,
  attemptCheckout,
  attemptSuspend,
  deleteSuspend,
  setChartData,
  getParentCategoryIcon,
  setParentCategoryIcon,
  setNotiUnreadCount,
} = commonSlice.actions;

export const commonReducer = commonSlice.reducer;

export const getParentCategoryData = () => {
  return useSelector((store: RootState) => store.common.parentCategory);
};

export const getSubCategoryData = () => {
  return useSelector((store: RootState) => store.common.subCategory);
};

export const getParentCategoryIconData = () => {
  return useSelector((store: RootState) => store.common.parentCategoryIcon);
};

export const isReloadRequire = () => {
  return useSelector((store: RootState) => store.common.needToReload);
};
