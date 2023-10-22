import {useCallback, useState} from 'react';
import {FilmCard} from 'src/components/film-card';
import {TFilmCard} from 'src/types';


type Props = {
  films: TFilmCard[]
}

export function FilmsList(props: Props) {
  const {films} = props;
  const [activeFilm, setActiveFilm] = useState<TFilmCard | null>(null);
  const handleMouseEnter = useCallback((film: TFilmCard) => {
    setActiveFilm(film);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setActiveFilm(null);
  }, []);
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          onMouseEnter={() => handleMouseEnter(film)}
          onMouseLeave={handleMouseLeave}
          isActive={activeFilm === film}
          {...film}
        />
      ))}
    </div>
  );
}
