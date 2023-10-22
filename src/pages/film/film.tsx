import {Link, Navigate, useParams} from 'react-router-dom';
import {Header} from 'src/components/header';
import {Footer} from 'src/components/footer';
import {FilmsList} from 'src/components/films-list';
import {MyListButton, PlayButton} from 'src/components/buttons';
import {RoutePathname} from 'src/constants';
import {Tabs} from 'src/components/tabs';
import {TFilmCard} from 'src/types';


type Props = {
  films: TFilmCard[]
}

export function Film(props: Props) {
  const {films} = props;
  const {id = ''} = useParams();
  const film = films.find((f) => f.id === id);
  if (!film) {
    return <Navigate to={`/${RoutePathname.NOT_FOUND}`}/>;
  }
  const moreLikeFilms = films
    .filter((f) => f.genre === film.genre && f.id !== film.id)
    .slice(0, 4);
  const {
    title,
    preview,
    genre,
    year,
    poster
  } = film;
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={preview} alt={title}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{year}</span>
              </p>
              <div className="film-card__buttons">
                <PlayButton/>
                <MyListButton/>
                <Link
                  to={`/${RoutePathname.FILMS}/${id}/${RoutePathname.REVIEW}`}
                  className="btn film-card__button"
                >
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={poster} alt={`${title} poster`} width="218" height="327"/>
            </div>
            <div className="film-card__desc">
              <Tabs film={film} />
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={moreLikeFilms}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}
