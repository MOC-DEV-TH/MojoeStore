import {createSlice} from '@reduxjs/toolkit';
import {clearStorage} from '@utils';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {OWNER} from '@constants';

const initialState = {
  isLoggedIn: false,
  userInfo: {
    role: '',
    data: {},
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    attemptLogin: (state, action) => {},
    attemptLogout: () => {},
    loadLogin: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo.role = action.payload.role;
    },
    loadLogout: state => {
      state.isLoggedIn = false;
      state.userInfo.role = '';
    },
    setUserInfo: (state, action) => {
      state.userInfo.data = action.payload;
    },
    getProfile: (state) => {},
    updateProfile: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {attemptLogin, attemptLogout, loadLogin, loadLogout, setUserInfo, updateProfile, getProfile} =
  authSlice.actions;

export const authReducer = authSlice.reducer;

export const isOwner = () => {
  const role = useSelector((store: RootState) => store.auth.userInfo.role);
  return role === OWNER;
};

export const getUserInfo = () => {
  return useSelector((store: RootState) => store.auth.userInfo.data);
};