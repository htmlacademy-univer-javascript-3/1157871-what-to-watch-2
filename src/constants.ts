export const enum RoutePathname {
  main = '/',
  login = 'login',
  myList = 'mylist',
  films = 'films',
  review = 'review',
  player = 'player',
  notFound = '404'
}

export enum ReduxStateStatus {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
  idle = 'idle'
}

export enum AuthorizationStatus {
  notAuthorized = 'notAuthorized',
  authorized = 'authorized'
}

export const GENRE_FOR_ALL_FILMS = 'All films';

export enum FilmStatus {
  addToFavorite = 1,
  deleteFromFavorite = 0
}

export const ONE_HUNDRED_PERCENT = 100;
