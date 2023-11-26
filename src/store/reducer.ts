import {combineReducers} from '@reduxjs/toolkit';
import {authorization} from './authorization/reducer';
import {films} from './films/reducer';
import {film} from './film/reducer';
import {genre} from './genre/slice';
import {player} from './player/slice';


export const rootReducer = combineReducers({
  film, films, authorization, genre, player
});
