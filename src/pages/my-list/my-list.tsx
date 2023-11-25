import {useEffect} from 'react';
import {Header} from 'src/components/header';
import {Footer} from 'src/components/footer';
import {FilmsList} from 'src/components/films-list';
import {fetchFavoriteFilms} from 'src/store/films/api';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {FilmsSelector} from 'src/store/films/selectors';


export function MyList() {
  const favoriteFilms = useAppSelector(FilmsSelector.favorite);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);
  if (!favoriteFilms) {
    return null;
  }
  return (
    <div className="user-page">
      <Header />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={favoriteFilms}/>
      </section>
      <Footer />
    </div>
  );
}
