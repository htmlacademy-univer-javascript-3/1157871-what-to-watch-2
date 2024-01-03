import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from 'src/api';
import {State} from 'src/store/types';
import {ReviewForm} from './review-form';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {}, authorization: {}, genre: {}, player: {}
});

describe('ReviewForm component', () => {
  const mockFilmId = '123';
  it('should render the review form with the correct elements', () => {
    const {getByPlaceholderText, getAllByRole, getByText} = render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm filmId={mockFilmId}/>
        </BrowserRouter>
      </Provider>
    );

    const ratingInputs = getAllByRole('radio');
    expect(ratingInputs.length).toBe(10);

    const commentTextarea = getByPlaceholderText('Review text');
    expect(commentTextarea).toBeInTheDocument();

    const submitButton = getByText('Post');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
