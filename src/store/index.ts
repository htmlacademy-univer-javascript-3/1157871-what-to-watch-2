import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {createAPI} from 'src/api';
import {rootReducer} from './reducer';


const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api
    }
  }).concat(logger)
});

