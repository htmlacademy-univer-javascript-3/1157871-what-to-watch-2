import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {format} from 'date-fns';
import {useAppDispatch, useAppSelector} from 'src/store';
import {fetchFilmComments} from 'src/store/api';


export function TabReviews() {
  const {id = ''} = useParams();
  const filmsComments = useAppSelector((state) => state.filmsComments);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFilmComments(id));
  }, [id, dispatch]);
  if (!filmsComments) {
    return null;
  }
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {filmsComments.map((review) => {
          const {
            comment,
            user,
            date,
            rating,
            id: commentId
          } = review;
          return (
            <div key={commentId} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{user}</cite>
                  <time className="review__date" dateTime={format(new Date(date), 'MMMM d, yyyy-MM-dd')}>
                    {format(new Date(date), 'MMMM d, yyyy')}
                  </time>
                </footer>
              </blockquote>
              <div className="review__rating">{rating}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
