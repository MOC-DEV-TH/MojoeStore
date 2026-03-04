import {Action, PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface MessageState {
  type?: 'success' | 'error' | 'warning' | '';
  loading?: boolean;
  isShowMessage?: boolean;
  title?: string;
  message?: string;
  btnLeftText?: string;
  btnRightText?: string;
  leftActionType?: 'dispatch' | 'navigate' | 'goback' | '';
  rightActionType?: 'dispatch' | 'navigate' | 'goback' | '';
  leftAction?: string | Action;
  rightAction?: string | Action;
}

const initialState: MessageState = {
  type: '',
  isShowMessage: false,
  title: '',
  message: '',
  btnLeftText: '',
  btnRightText: '',
  leftActionType: '',
  rightActionType: '',
  leftAction: '',
  rightAction: '',
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessageErrorRoot: (state, action: PayloadAction<any | null>) => {
      state.isShowMessage = true;
      state.type = 'error';
      state.title = action.payload?.title || 'အချက်အလက်';
      state.message = action.payload?.message || 'တစုံတရာ မှားယွင်းနေပါသည်';
      state.btnLeftText = action.payload?.btnLeftText || 'Close';
      state.btnRightText = action.payload?.btnRightText || '';
      (state.leftActionType = action.payload?.leftActionType || ''),
        (state.rightActionType = action.payload?.rightActionType || ''),
        (state.leftAction = action.payload?.leftAction || '');
      state.rightAction = action.payload?.rightAction || '';
    },
    showMessageSuccessRoot: (state, action: PayloadAction<any | null>) => {
      state.isShowMessage = true;
      state.type = 'success';
      state.title = action.payload?.title || 'လုပ်ဆောင်ချက်အောင်မြင်ပါသည်';
      state.message = action.payload?.message || 'အောင်မြင်သည်။';
      state.btnLeftText = action.payload?.btnLeftText || 'Close';
      state.btnRightText = action.payload?.btnRightText || '';
      (state.leftActionType = action.payload?.leftActionType || ''),
        (state.rightActionType = action.payload?.rightActionType || ''),
        (state.leftAction = action.payload?.leftAction || '');
      state.rightAction = action.payload?.rightAction || '';
    },
    hideMessageRoot: state => {
      state.type = '';
      state.loading = false;
      state.isShowMessage = false;
      state.title = '';
      state.message = '';
      state.btnLeftText = '';
      state.btnRightText = '';
      (state.leftActionType = ''),
        (state.rightActionType = ''),
        (state.leftAction = '');
      state.rightAction = '';
    },
  },
});

export const {showMessageErrorRoot, showMessageSuccessRoot, hideMessageRoot} =
  messageSlice.actions;

export const messageReducer = messageSlice.reducer;
