import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import authReducer from 'features/auth/authSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'ultis';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
import cityReducers from 'features/city/citySlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducers,
})
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=> 
    getDefaultMiddleware({
      thunk: true, //bật tắt middleware
      //serializableCheck là middleware để xuất lỗi khi giá trị là func, symbol,..
    }).concat(sagaMiddleware, routerMiddleware(history))
  ,
});

sagaMiddleware.run(rootSaga)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
