import {store} from 'src/store/index';
import {AuthorizationStatus} from 'src/constants';
import {TComment, TFilm, TFilmCard, TFilmPromo} from 'src/types';


export type AppDispatch = typeof store.dispatch;

export type State = {
  genre: string,
  films: TFilmCard[] | null,
  promoFilm: TFilmPromo | null,
  film: TFilm | null,
  filmsSimilar: TFilmCard[] | null,
  filmsComments: TComment[] | null,
  favoriteFilms: TFilmCard[] | null,
  authorizationStatus: AuthorizationStatus | null
}
