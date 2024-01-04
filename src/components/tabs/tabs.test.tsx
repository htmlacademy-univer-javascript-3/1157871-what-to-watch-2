import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from 'src/api';
import {State} from 'src/store/types';
import {TFilm} from 'src/types';
import {Tabs} from './tabs';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {}, authorization: {}, genre: {}, player: {}
});

describe('Tabs component', () => {
  const mockFilm: TFilm = {
    backgroundColor: '#ffffff',
    backgroundImage: 'https://example.com/background-image.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    director: 'John Doe',
    genre: 'Drama',
    id: '123',
    isFavorite: false,
    name: 'Film Name',
    posterImage: 'https://example.com/poster-image.jpg',
    rating: 8.5,
    released: 2021,
    runTime: 120,
    scoresCount: 1000,
    starring: ['Actor 1', 'Actor 2', 'Actor 3'],
    videoLink: 'https://example.com/video-link.mp4'
  };

  it('should render the tabs navigation with correct active tab', () => {

    const {getByRole} = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tabs film={mockFilm}/>
        </BrowserRouter>
      </Provider>
    );

    expect(getByRole('link', {name: 'Overview'})).toHaveClass('film-nav__link');
  });
});
