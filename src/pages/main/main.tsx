import {useEffect, useState} from 'react';
import {useSnackbar} from 'notistack';
import {Header} from 'src/components/header';
import {Footer} from 'src/components/footer';
import {MyListButton, PlayButton} from 'src/components/buttons';
import {ListOfGenres} from 'src/components/list-of-genres';
import {FilmsList} from 'src/components/films-list';
import {Spinner} from 'src/components/spinner';
import {ReduxStateStatus} from 'src/constants';
import {useFiltredFilms} from 'src/hooks';
import {useAppDispatch, useAppSelector} from 'src/store';
import {fetchFilms, fetchPromoFilm} from 'src/store/api';


export function Main() {
  const dispatch = useAppDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {films, promoFilm} = useAppSelector((state) => state);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchFilms())
      .then((res) => {
        if (res.meta.requestStatus === ReduxStateStatus.rejected) {
          enqueueSnackbar(
            'Не удалось загрузить список фильмов',
            {variant: 'error'}
          );
        }
        return null;
      })
      .finally(() => {
        setLoading(false);
      });
    dispatch(fetchPromoFilm());
  }, [dispatch, enqueueSnackbar]);
  const filtredFilms = useFiltredFilms();
  let filmPromoContent = null;
  if (promoFilm) {
    const {name, genre, released, backgroundImage, posterImage} = promoFilm;
    filmPromoContent = (
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <PlayButton/>
                <MyListButton/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      {filmPromoContent}
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {loading && <Spinner/>}
          {!loading && (
            <>
              {films && <ListOfGenres films={films}/>}
              {filtredFilms && <FilmsList films={filtredFilms}/>}
            </>
          )}
        </section>
        <Footer/>
      </div>
    </>
  );
}
