import {enqueueSnackbar} from 'notistack';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {TComment, TCommentRequest, TFilm, TFilmCard, TFilmPromo} from 'src/types';
import {AuthorizationStatus} from 'src/constants';
import {getSavedToken} from 'src/token';
import {updateAuthorizationStatus} from '../authorization/action';
import {AppDispatch, State} from '../types';
import {updateFilm, updateFilmComments, updateFilmsSimilar, updatePromoFilm} from './action';


export const fetchPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchPromo',
  async (_arg, {rejectWithValue, dispatch, extra: api}) => {
    try {
      const {data: film} = await api.get<TFilmPromo>('/promo');
      dispatch(updatePromoFilm(film));
    } catch (e) {
      enqueueSnackbar('Failed to load promo film', {variant: 'error'});
      return rejectWithValue(e);
    }
  },
);

export const fetchFilm = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetch',
  async (arg, {dispatch, extra: api}) => {
    const {data: film} = await api.get<TFilm>(`/films/${arg}`);
    dispatch(updateFilm(film));
  },
);

export const fetchFilmSimilar = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchSimilar',
  async (arg, {dispatch, extra: api}) => {
    try {
      const {data: films} = await api.get<TFilmCard[]>(`/films/${arg}/similar`);
      dispatch(updateFilmsSimilar(films));
    } catch (_e) {
      enqueueSnackbar('Failed to load similar films', {variant: 'error'});
    }
  },
);

export const fetchFilmComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchComments',
  async (arg, {dispatch, extra: api}) => {
    try {
      const {data: comments} = await api.get<TComment[]>(`/comments/${arg}`);
      dispatch(updateFilmComments(comments));
    } catch (_e) {
      enqueueSnackbar('Failed to load film comments', {variant: 'error'});
    }
  },
);

export const postComments = createAsyncThunk<void, TCommentRequest, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/postComments',
  async (arg, {rejectWithValue, dispatch, extra: api}) => {
    const {filmId, comment, rating} = arg;
    const token = getSavedToken();
    try {
      await api.post<TComment>(
        `/comments/${filmId}`,
        {comment, rating},
        {headers: {'X-Token': token}}
      );
      dispatch(updateAuthorizationStatus(AuthorizationStatus.authorized));
    } catch (e) {
      enqueueSnackbar('Failed to post comment', {variant: 'error'});
      return rejectWithValue(e);
    }
  },
);
