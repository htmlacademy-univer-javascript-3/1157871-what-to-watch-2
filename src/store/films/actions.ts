import {createAction} from '@reduxjs/toolkit';
import {TFilmCard} from 'src/types';


const Actions = {
  UPDATE_FILMS: 'films/updateList',
  UPDATE_FAVORITE_FILMS: 'films/updateFavorite'
} as const;

export const updateFilms = createAction(
  Actions.UPDATE_FILMS,
  (value: TFilmCard[]): { payload: TFilmCard[] } => ({
    payload: value
  })
);

export const updateFavoriteFilms = createAction(
  Actions.UPDATE_FAVORITE_FILMS,
  (value: TFilmCard[]): { payload: TFilmCard[] } => ({
    payload: value
  })
);
