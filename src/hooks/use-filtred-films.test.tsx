import {JSX} from 'react';
import thunk from 'redux-thunk';
import {State} from 'src/store/types';
import {Provider} from 'react-redux';
import {renderHook} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from 'src/api';
import {BrowserRouter} from 'react-router-dom';
import {GENRE_FOR_ALL_FILMS} from 'src/constants';
import {TFilmCard} from 'src/types';
import {useFiltredFilms} from './use-filtred-films';


const mockFilms: TFilmCard[] = [
  {
    genre: 'Drama',
    id: '1',
    name: 'Film 1',
    previewImage: '/path/to/preview1.jpg',
    previewVideoLink: '/path/to/preview1.mp4',
  },
  {
    genre: 'Action',
    id: '2',
    name: 'Film 2',
    previewImage: '/path/to/preview2.jpg',
    previewVideoLink: '/path/to/preview2.mp4',
  }
];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {
    list: mockFilms
  }, authorization: {}, genre: {genre: GENRE_FOR_ALL_FILMS}, player: {}
});
const wrapper = ({children}: { children: JSX.Element }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('useFilteredFilms hook', () => {
  it('should return all films if genre is "All"', () => {
    const {result} = renderHook(() => useFiltredFilms(), {wrapper});
    expect(result.current).toEqual(mockFilms);
  });
});
