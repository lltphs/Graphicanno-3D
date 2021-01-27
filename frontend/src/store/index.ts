import { createStore, applyMiddleware, Action, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import rootReducer from 'store/reducers';

import { interceptorJWT } from '../api/auth';

export type RootStateType = ReturnType<typeof rootReducer>;

export type RootDispatchType = typeof store.dispatch;

export type DispatchFunctionType = ThunkDispatch<
  RootStateType,
  undefined,
  AnyAction
>;

export type RootThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  Action<string>
>;

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware<DispatchFunctionType, RootStateType>(...middleware)
  )
);

interceptorJWT(store);

export default store;
