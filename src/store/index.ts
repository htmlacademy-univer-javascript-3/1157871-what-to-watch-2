import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import logger from 'redux-logger';
import {updateStore} from './reducer';
import {State, AppDispatch} from './types';


export const store = configureStore({
  reducer: updateStore,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
