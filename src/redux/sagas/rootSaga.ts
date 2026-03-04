import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import authSaga from './authSaga';
import infiniteSaga from './infiniteSaga';
import inventorySaga from './inventorySaga';
import commonSaga from './commonSaga';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(infiniteSaga),
    fork(inventorySaga),
    fork(commonSaga),
  ]);
}
