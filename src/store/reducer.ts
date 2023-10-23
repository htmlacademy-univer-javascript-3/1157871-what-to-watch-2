import {createReducer} from '@reduxjs/toolkit';
import {filmsMocks} from 'src/mocks/films';
import {GENRE_FOR_ALL_FILMS} from 'src/constants';
import {changeGenre} from './action';
import {State} from './types';


const initialState: State = {
  genre: GENRE_FOR_ALL_FILMS,
  films: filmsMocks
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    });
});
