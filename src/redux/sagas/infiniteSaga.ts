import {call, put, select, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {isUndefined} from '@utils';
import {requestDynamicInfiniteApi} from '@services';
import {init, showMessageErrorRoot} from '@slices';

export default function* infiniteSaga() {
  yield takeLatest(init.type, initSaga);
}

function* initSaga(action: PayloadAction<any>) {
  const {payload} = action;
  try {
    const respond = yield call(
      requestDynamicInfiniteApi,
      payload?.url,
      payload?.params,
      payload?.config,
    );
    console.log('== infiniteSaga respond ==', respond);
    if (respond) {
      yield call(payload.onSuccess, respond);
      return;
    }
    throw respond;
  } catch (error: any) {
    if (!isUndefined(payload?.onError)) {
      yield call(payload.onError, error?.message);
    }
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}
