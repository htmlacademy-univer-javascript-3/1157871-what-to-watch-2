import {enqueueSnackbar} from 'notistack';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {getSavedToken} from 'src/token';
import {TFilm, TFilmCard} from 'src/types';
import {AppDispatch, State} from '../types';
import {updateFavoriteFilms, updateFilms} from './actions';
import {FilmStatus} from 'src/constants';


export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'films/fetchList',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: films} = await api.get<TFilmCard[]>('/films');
      dispatch(updateFilms(films));
    } catch (_e) {
      enqueueSnackbar('Failed to load films', {variant: 'error'});
    }
  },
);

export const fetchFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'films/fetchFavorite',
  async (_arg, {dispatch, extra: api}) => {
    const token = getSavedToken();
    try {
      const {data: films} = await api.get<TFilmCard[]>('/favorite', {headers: {'X-Token': token}});
      dispatch(updateFavoriteFilms(films));
    } catch (_e) {
      enqueueSnackbar('Failed to load favorite films', {variant: 'error'});
    }
  },
);

export const postFilmStatus = createAsyncThunk<void, {filmId: string, status: FilmStatus}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'films/postFilmStatus',
  async (arg, {dispatch, extra: api}) => {
    const {filmId, status} = arg;
    const token = getSavedToken();
    try {
      await api.post<TFilm[]>(`/favorite/${filmId}/${status}`, {}, {headers: {'X-Token': token}});
      dispatch(fetchFavoriteFilms());
    } catch (_e) {
      enqueueSnackbar('Failed to add/delete favorite film', {variant: 'error'});
    }
  },
);
