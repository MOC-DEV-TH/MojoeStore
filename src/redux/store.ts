import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '@sagas';
import {
  authReducer,
  loadingReducer,
  messageReducer,
  infiniteReducer,
  cashierReducer,
  inventoryReducer,
  commonReducer,
} from '@slices';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cashier: cashierReducer,
    inventory: inventoryReducer,
    message: messageReducer,
    loading: loadingReducer,
    infinite: infiniteReducer,
    common: commonReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
