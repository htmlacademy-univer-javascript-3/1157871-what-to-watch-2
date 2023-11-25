import {ChangeEvent, FormEvent, Fragment, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import {postComments} from 'src/store/film/api';
import {ReduxStateStatus, RoutePathname} from 'src/constants';

import {useAppDispatch} from 'src/store/hooks';


const MIN_LENGTH = 50;
const MAX_LENGTH = 400;

type Props = {
  filmId: string
}

export function ReviewForm(props: Props) {
  const {filmId} = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const [formData, setFormData] = useState({
    rating: '',
    comment: ''
  });
  const isButtonDisabled = formData.rating === ''
    || formData.comment.length > MAX_LENGTH
    || formData.comment.length < MIN_LENGTH;
  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }, [formData]);
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const {rating, comment} = formData;
    dispatch(postComments({comment, rating: Number(rating), filmId}))
      .then((res) => {
        if (res.meta.requestStatus === ReduxStateStatus.rejected) {
          enqueueSnackbar(
            'Не удалось отправить комментарий',
            {variant: 'error'}
          );
        } else {
          navigate(`/${RoutePathname.films}/${filmId}#reviews`);
        }
        return null;
      });
  }, [dispatch, navigate, enqueueSnackbar, filmId, formData]);
  return (
    <form className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {Array.from({length: 10}).map((_, index) => {
            const value = 10 - index;
            return (
              <Fragment key={value}>
                <input
                  className="rating__input"
                  id={`start-${value}`}
                  type="radio"
                  name="rating"
                  value={value}
                  onChange={handleChange}
                />
                <label
                  className="rating__label"
                  htmlFor={`start-${value}`}
                >
                  Rating {value}
                </label>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="comment"
          id="comment"
          placeholder="Review text"
          onChange={handleChange}
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={isButtonDisabled}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
