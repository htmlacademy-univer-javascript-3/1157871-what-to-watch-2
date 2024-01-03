import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from 'src/api';
import {State} from 'src/store/types';
import {TFilmCard} from 'src/types';
import {ListOfGenres} from './list-of-genres';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {}, authorization: {}, genre: {}, player: {}
});

describe('ListOfGenres component', () => {
  const mockFilms: TFilmCard[] = [{
    genre: 'Drama',
    id: '12345',
    name: 'Example Movie',
    previewImage: 'https://example.com/preview.jpg',
    previewVideoLink: 'https://example.com/preview.mp4'
  }];


  it('should render the list of genres with the correct active genre', () => {

    const {getByText} = render(
      <Provider store={store}>
        <BrowserRouter>
          <ListOfGenres films={mockFilms}/>
        </BrowserRouter>
      </Provider>
    );

    const dramaGenre = getByText('Drama').parentNode;
    expect(dramaGenre).not.toHaveClass('catalog__genres-item--active');
  });
});
