import {useCallback, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from 'src/store';
import {changeGenre} from 'src/store/action';
import {GENRE_FOR_ALL_FILMS} from 'src/constants';
import {TFilmCard} from 'src/types';
import './list-of-genres.css';


type Props = {
  films: TFilmCard[]
}

export function ListOfGenres(props: Props) {
  const {films} = props;
  const genre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();
  const handleClick = useCallback(
    (g: string) => dispatch(changeGenre(g)),
    [dispatch]
  );
  const listOfGenres = useMemo(() => {
    const newListOfGenres = new Set<string>();
    films.forEach((film) => newListOfGenres.add(film.genre));
    return [GENRE_FOR_ALL_FILMS, ...newListOfGenres.values()];
  }, [films]);
  return (
    <ul className="catalog__genres-list">
      {listOfGenres.map((filmGenre) => {
        const className = [
          'catalog__genres-item',
          filmGenre === genre && 'catalog__genres-item--active'
        ].filter(Boolean).join(' ');
        return (
          <li key={filmGenre} className={className}>
            <button
              type="button"
              onClick={() => handleClick(filmGenre)}
              className="catalog__genres-link clean-button"
            >
              {filmGenre}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
