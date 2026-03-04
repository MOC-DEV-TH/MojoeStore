import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  attemptLogin,
  attemptLogout,
  getProfile,
  hideLoadingRoot,
  loadLogin,
  loadLogout,
  setUserInfo,
  showLoadingRoot,
  showMessageErrorRoot,
  updateProfile,
} from '@slices';
import {
  requestLogin,
  requestProfileApi,
  requestUpdateProfileApi,
} from '@services';
import {isUndefined} from 'src/utils/Utils';
import {clearStorage, saveToStorage} from '@utils';
import {AUTH_INFO, OWNER, STAFF} from '@constants';

export default function* authSaga() {
  yield takeLatest(attemptLogin.type, attemptLoginSaga);
  yield takeLatest(attemptLogout.type, attemptLogoutSaga);
  yield takeLatest(updateProfile.type, updateProfileSaga);
  yield takeLatest(getProfile.type, getProfileSaga);
}

function* attemptLoginSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestLogin, payload);
    const authorize = response.authorization;
    if (!isUndefined(authorize?.token)) {
      yield put(hideLoadingRoot());
      yield put(loadLogin({role: authorize.role === OWNER || STAFF}));
      yield call(
        saveToStorage,
        AUTH_INFO,
        JSON.stringify({
          token: response.authorization.token,
          role: authorize.role,
        }),
      );
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: 'Email or password is incorrect. Verify credentials.',
      }),
    );
    console.log('attemptLoginSaga err', error);
  }
}

function* attemptLogoutSaga(action: PayloadAction<any>) {
  console.log('trying.. to logout');
  try {
    yield call(clearStorage, AUTH_INFO);
    yield put(loadLogout());
  } catch (error) {
    console.log('attemptLogoutSaga err', error);
  }
}

function* updateProfileSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    console.log('updateProfileSaga payload', payload);
    const response = yield call(requestUpdateProfileApi, payload.body);
    console.log('response', response);
    if (payload.onSuccess) yield call(payload.onSuccess);
    yield put(hideLoadingRoot());
  } catch (error) {
    yield put(hideLoadingRoot());
  }
}

function* getProfileSaga() {
  try {
    yield put(showLoadingRoot());
    const response = yield call(requestProfileApi);
    if (response?.status === 'Success') {
      yield put(setUserInfo(response?.data));
    }
  } catch (error) {
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  } finally {
    yield put(hideLoadingRoot());
  }
}
