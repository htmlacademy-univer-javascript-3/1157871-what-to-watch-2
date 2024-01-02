import {createAction} from '@reduxjs/toolkit';
import {TComment, TFilm, TFilmCard, TFilmPromo} from 'src/types';


const Actions = {
  UPDATE_FILM_PROMO: 'film/updatePromo',
  UPDATE_FILM: 'film/update',
  UPDATE_FILM_SIMILAR: 'film/updateSimilar',
  UPDATE_FILM_COMMENTS: 'film/updateComments'
} as const;

export const updatePromoFilm = createAction(
  Actions.UPDATE_FILM_PROMO,
  (value: TFilmPromo): { payload: TFilmPromo } => ({
    payload: value
  })
);

export const updateFilm = createAction(
  Actions.UPDATE_FILM,
  (value: TFilm): { payload: TFilm } => ({
    payload: value
  })
);

export const updateFilmsSimilar = createAction(
  Actions.UPDATE_FILM_SIMILAR,
  (value: TFilmCard[]): { payload: TFilmCard[] } => ({
    payload: value
  })
);


export const updateFilmComments = createAction(
  Actions.UPDATE_FILM_COMMENTS,
  (value: TComment[]): { payload: TComment[] } => ({
    payload: value
  })
);
