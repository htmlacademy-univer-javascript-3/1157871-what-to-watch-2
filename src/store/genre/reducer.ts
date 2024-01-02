import {createReducer} from '@reduxjs/toolkit';
import {GENRE_FOR_ALL_FILMS} from 'src/constants';
import {changeGenre} from './actions';
import {State} from './types';


const initialState: State = {
  genre: GENRE_FOR_ALL_FILMS
};

export const genre = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    });
});
