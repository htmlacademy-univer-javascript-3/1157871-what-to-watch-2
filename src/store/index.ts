import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import logger from 'redux-logger';
import {createAPI} from 'src/api';
import {updateStore} from './reducer';
import {AppDispatch, State} from './types';


const api = createAPI();

export const store = configureStore({
  reducer: updateStore,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }).concat(logger)
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
