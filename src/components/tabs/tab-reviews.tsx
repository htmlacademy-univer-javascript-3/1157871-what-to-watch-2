import {format} from 'date-fns';
import {TReview} from 'src/types';


type Props = {
  reviews: TReview[]
}

export function TabReviews(props: Props) {
  const {reviews} = props;
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => {
          const {
            text,
            author,
            date,
            raiting,
            id
          } = review;
          return (
            <div key={id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{text}</p>
                <footer className="review__details">
                  <cite className="review__author">{author}</cite>
                  <time className="review__date" dateTime={format(date, 'MMMM d, yyyy-MM-dd')}>
                    {format(date, 'MMMM d, yyyy')}
                  </time>
                </footer>
              </blockquote>
              <div className="review__rating">{raiting}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
