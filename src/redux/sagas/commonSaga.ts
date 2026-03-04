import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  attemptCheckout,
  attemptSuspend,
  createCategory,
  createProduct,
  createSubCategory,
  deleteSuspend,
  getBarcodeProduct,
  getParentCategory,
  getParentCategoryIcon,
  getChartDataById,
  getProductByCategory,
  hideLoadingRoot,
  setChartData,
  setParentCategory,
  showLoadingRoot,
  showMessageErrorRoot,
  showMessageSuccessRoot,
  updateCategory,
  updateProduct,
  setParentCategoryIcon,
} from '@slices';
import {isUndefined} from 'src/utils/Utils';
import {
  requestBarcodeApi,
  requestCategoryApi,
  requestChartDataByIdApi,
  requestCheckoutApi,
  requestCreateCategoryApi,
  requestCreateProductApi,
  requestCreateSubCategoryApi,
  requestDeleteSuspendApi,
  requestGetCategoryIconApi,
  requestProductByCategoryApi,
  requestSuspendApi,
  requestUpdateProductApi,
} from '@services';
import {SUMMARY_PERIOD} from '@constants';
export default function* commonSaga() {
  yield takeLatest(getChartDataById.type, getChartDataByIdSaga);
  yield takeLatest(getProductByCategory.type, getProductByCategorySaga);
  yield takeLatest(getParentCategory.type, getParentCategorySaga);
  yield takeLatest(createCategory.type, createCategorySaga);
  yield takeLatest(createSubCategory.type, createSubCategorySaga);
  yield takeLatest(createProduct.type, createProductSaga);
  yield takeLatest(updateProduct.type, updateProductSaga);
  yield takeLatest(getBarcodeProduct.type, getBarcodeProductSaga);
  yield takeLatest(attemptCheckout.type, attemptCheckoutSaga);
  yield takeLatest(attemptSuspend.type, attemptSuspendSaga);
  yield takeLatest(deleteSuspend.type, deleteSuspendSaga);
  yield takeLatest(getParentCategoryIcon.type, getParentCategoryIconSaga);
}

function* getChartDataByIdSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestChartDataByIdApi, payload.id);
    if (response.status === 'success' && response.data) {
      const transformData = response.data.map(({date, total}) => {
        if (payload.type === SUMMARY_PERIOD.ONE_MONTH) {
          return {
            x: new Date(date),
            y: total,
          };
        }

        return {
          x: date,
          y: total,
        };
      });
      yield put(
        setChartData({data: transformData, revenue: response?.revenue}),
      );
      yield put(hideLoadingRoot());
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* getProductByCategorySaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(
      requestProductByCategoryApi,
      payload?.categoryId,
    );
    console.log('response', response);
    if (!isUndefined(response.data) && !isUndefined(payload?.onSuccess)) {
      yield put(hideLoadingRoot());
      payload.onSuccess(response.data);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* getParentCategorySaga() {
  try {
    yield put(showLoadingRoot());
    const response = yield call(requestCategoryApi);
    console.log('response', response);
    if (!isUndefined(response.data)) {
      yield put(hideLoadingRoot());
      yield put(setParentCategory(response.data));
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* createCategorySaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestCreateCategoryApi, payload.body);
    console.log('response', response);
    if (!isUndefined(response.data)) {
      yield put(hideLoadingRoot());
      yield put(updateCategory(response.data));
      yield put(
        showMessageSuccessRoot({
          message: response.message || 'Category Created Successfully',
        }),
      );
      if (payload.onSuccess) yield call(payload.onSuccess);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* createSubCategorySaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestCreateSubCategoryApi, payload.body);
    console.log('response', response);
    if (!isUndefined(response.data)) {
      yield put(hideLoadingRoot());
      yield put(updateCategory(response.data));
      yield put(
        showMessageSuccessRoot({
          message: response.message || 'Sub Category Created Successfully',
        }),
      );
      if (payload.onSuccess) yield call(payload.onSuccess);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* createProductSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestCreateProductApi, payload.body);
    console.log('response', response);
    if (!isUndefined(response.data)) {
      yield put(hideLoadingRoot());
      yield put(
        showMessageSuccessRoot({
          message: response.message || 'Product Created Successfully',
        }),
      );
      if (payload.onSuccess) yield call(payload.onSuccess);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* updateProductSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(
      requestUpdateProductApi,
      payload.id,
      payload.params,
    );
    console.log('response', response);
    if (!isUndefined(response)) {
      yield put(hideLoadingRoot());
      yield put(
        showMessageSuccessRoot({
          message: response.message || 'Product Updated Successfully',
        }),
      );
      if (payload.onSuccess) yield call(payload.onSuccess);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message || error,
      }),
    );
  }
}

function* getBarcodeProductSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestBarcodeApi, payload.body);
    console.log('response', response);
    if (!isUndefined(response)) {
      yield put(hideLoadingRoot());
      if (payload.onSuccess) yield call(payload.onSuccess, response.data);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message || error,
      }),
    );
  }
}

function* attemptCheckoutSaga(action: PayloadAction<any>) {
  const {payload} = action;
  try {
    yield put(showLoadingRoot());
    const response = yield call(requestCheckoutApi, payload.body);
    console.log('response', response);
    if (!isUndefined(response.code) && response.code === 200) {
      yield put(hideLoadingRoot());
      if (payload.onSuccess) yield call(payload.onSuccess, response.data);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    if (payload.onError) yield call(payload.onError);
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* attemptSuspendSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestSuspendApi, payload.body);
    console.log('response', response);
    if (!isUndefined(response.code) && response.code === 200) {
      yield put(hideLoadingRoot());
      if (payload.onSuccess) yield call(payload.onSuccess, response.data);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* deleteSuspendSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestDeleteSuspendApi, payload.id);
    console.log('response', response);
    if (!isUndefined(response.code) && response.code === 200) {
      yield put(hideLoadingRoot());
      if (payload.onSuccess) yield call(payload.onSuccess, response.data);
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}

function* getParentCategoryIconSaga(action: PayloadAction<any>) {
  try {
    yield put(showLoadingRoot());
    const {payload} = action;
    const response = yield call(requestGetCategoryIconApi);
    if (!isUndefined(response.data)) {
      console.log('parentCategoryIcon', response.data);
      yield put(hideLoadingRoot());
      yield put(setParentCategoryIcon(response.data));
      return;
    }
    throw response;
  } catch (error) {
    yield put(hideLoadingRoot());
    yield put(
      showMessageErrorRoot({
        message: error?.message ?? error,
      }),
    );
  }
}
