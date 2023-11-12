import {Link, useParams} from 'react-router-dom';
import {useFetchFilm} from 'src/hooks';
import {useAppSelector} from 'src/store';
import {RoutePathname} from 'src/constants';
import {Header} from 'src/components/header';
import {ReviewForm} from 'src/components/review-form';


export function AddReview() {
  const {id = ''} = useParams();
  const {film} = useAppSelector((state) => state);
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
            to={`/${RoutePathname.FILMS}/${id}`}
            className="breadcrumbs__link"
          >
            {name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link
            to={`/${RoutePathname.FILMS}/${id}/${RoutePathname.REVIEW}`}
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
        <ReviewForm />
      </div>
    </section>
  );
}
