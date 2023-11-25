import {TComment, TFilm, TFilmCard, TFilmPromo} from 'src/types';


export type State = {
  promo: TFilmPromo | null,
  film: TFilm | null,
  similar: TFilmCard[] | null,
  comments: TComment[] | null
}
