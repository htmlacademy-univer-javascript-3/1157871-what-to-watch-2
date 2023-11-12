import {useMemo} from 'react';
import {useAppSelector} from 'src/store';
import {GENRE_FOR_ALL_FILMS} from 'src/constants';


export function useFiltredFilms() {
  const {genre, films} = useAppSelector((state) => state);
  return useMemo(() => {
    if (!films) {
      return null;
    }
    if (genre === GENRE_FOR_ALL_FILMS) {
      return films;
    } else {
      return films.filter((film) => film.genre === genre);
    }
  }, [genre, films]);
}
