import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {DISCOUNT_TYPE_KYAT, DISCOUNT_TYPE_PERCENT} from '@constants';

interface ICashierStateType {
  currentOrderNumber: number | null;
  totalSuspendCount: number | null;
  pickedProducts: any[];
  totalAmountInfo: {
    amount: '';
    discount_amount: any;
    discount_type: any;
  };
}

const initialState: ICashierStateType = {
  currentOrderNumber: null,
  totalSuspendCount: null,
  pickedProducts: [],
  totalAmountInfo: {
    amount: '',
    discount_amount: null,
    discount_type: null,
  },
};

export const cashierSlice = createSlice({
  name: 'cashier',
  initialState,
  reducers: {
    updateTotalSuspendCount: (state, action) => {
      return {...state, totalSuspendCount: action.payload};
    },
    addProducts: (state, action) => {
      const products = action.payload || [];
      return {
        ...state,
        pickedProducts: products,
      };
    },
    addProductItem: (state, action) => {
      const productItem = action.payload || [];
      const productData = [...state.pickedProducts];
      const index = state.pickedProducts.findIndex(
        i => i.id === productItem.id,
      );

      // is already have?
      if (index !== -1) {
        productData[index] = {
          ...productData[index],
          addedQty: productData[index].addedQty + productItem.addedQty,
        };

        return {
          ...state,
          pickedProducts: productData,
        };
      }

      // if not
      return {
        ...state,
        pickedProducts: [
          ...state.pickedProducts,
          {
            ...productItem,
            addedQty: 1,
            discount_amount: null,
            discount_type: null,
          },
        ],
      };
    },
    updateProductItem: (state, action) => {
      const tempItemData = action.payload;
      const updatedItemData = state.pickedProducts.map(item =>
        item.id === tempItemData.id ? tempItemData : item,
      );
      return {...state, pickedProducts: updatedItemData};
    },
    removeProductItem: (state, action) => {
      const removeItemId = action.payload;
      const updatedItemData = state.pickedProducts.filter(
        item => item.id !== removeItemId,
      );
      return {...state, pickedProducts: updatedItemData};
    },
    updateTotalAmount: (state, action) => {
      const updatedTotalAmount = action.payload;
      return {...state, totalAmountInfo: updatedTotalAmount};
    },
    setCurrentOrderNumber: (state, action) => {
      return {...state, currentOrderNumber: action.payload};
    },
    clearPickedProduct: state => {
      return {...state, pickedProducts: []};
    },
  },
});

export const {
  addProducts,
  addProductItem,
  updateProductItem,
  removeProductItem,
  updateTotalAmount,
  clearPickedProduct,
  updateTotalSuspendCount,
  setCurrentOrderNumber,
} = cashierSlice.actions;
export const cashierReducer = cashierSlice.reducer;

export const getTotalSuspendCount = () => {
  return useSelector((store: RootState) => store.cashier.totalSuspendCount);
};

export const getPickedProducts = () => {
  return useSelector((store: RootState) => store.cashier.pickedProducts);
};

export const getTotalAmount = () => {
  return useSelector(
    (store: RootState) => store.cashier.totalAmountInfo.amount,
  );
};

export const getTotalAmountInfo = () => {
  return useSelector((store: RootState) => store.cashier.totalAmountInfo);
};

export const getCurrentOrderNumber = () => {
  return useSelector((store: RootState) => store.cashier.currentOrderNumber);
};

export const getCaculatedTotalAmount = (allPickedProduct: any[]) => {
  try {
    const totalAmount = allPickedProduct.reduce((preVal, currentVal) => {
      const pricePerUnit = currentVal?.selling_price;
      const discount_amount = currentVal?.discount_amount;
      const discount_type = currentVal?.discount_type;
      const addedQty = currentVal?.addedQty;

      if (discount_type === DISCOUNT_TYPE_PERCENT) {
        const percentAmount = pricePerUnit * (discount_amount / 100);
        const discountAmount = pricePerUnit - percentAmount;
        return discountAmount * addedQty + preVal;
      }
      if (discount_type === DISCOUNT_TYPE_KYAT) {
        const discountAmount = pricePerUnit - discount_amount;
        return discountAmount * addedQty + preVal;
      }
      return pricePerUnit * addedQty + preVal;
    }, 0);

    return totalAmount;
  } catch (error) {
    console.log('error', error);
    return 0;
  }
};

export const getCaculatedTotalAmountDue = (totalAmountInfo: any) => {
  const amount = totalAmountInfo?.amount;
  const discount_amount = totalAmountInfo?.discount_amount;
  const discount_type = totalAmountInfo?.discount_type;

  if (discount_type === DISCOUNT_TYPE_PERCENT) {
    const percentAmount = amount * (discount_amount / 100);
    const discountAmount = amount - percentAmount;
    return discountAmount;
  }
  if (discount_type === DISCOUNT_TYPE_KYAT) {
    const discountAmount = amount - discount_amount;
    return discountAmount;
  }

  return amount;
};
