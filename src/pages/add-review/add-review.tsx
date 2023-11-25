import {Link, useParams} from 'react-router-dom';
import {useFetchFilm} from 'src/hooks';
import {RoutePathname} from 'src/constants';
import {Header} from 'src/components/header';
import {ReviewForm} from 'src/components/review-form';
import {useAppSelector} from 'src/store/hooks';
import {FilmSelector} from 'src/store/film/selectors';


export function AddReview() {
  const {id = ''} = useParams();
  const film = useAppSelector(FilmSelector.film);
  useFetchFilm(id);
  if (!film) {
    return null;
  }
  const {name, backgroundImage, posterImage} = film;
  const breadcrumbs = (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to={`/${RoutePathname.films}/${id}`}
            className="breadcrumbs__link"
          >
            {name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link
            to={`/${RoutePathname.films}/${id}/${RoutePathname.review}`}
            className="breadcrumbs__link"
          >
            Add review
          </Link>
        </li>
      </ul>
    </nav>
  );
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header breadcrumbs={breadcrumbs}/>
        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
        </div>
      </div>
      <div className="add-review">
        <ReviewForm filmId={id} />
      </div>
    </section>
  );
}
