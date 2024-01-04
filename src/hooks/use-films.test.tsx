import {JSX} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {renderHook} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from 'src/api';
import {State} from 'src/store/types';
import {TFilmCard} from 'src/types';
import {useFilms} from './use-films';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const mockFilms: TFilmCard[] = [{
  genre: 'Drama',
  id: '12345',
  name: 'Example Movie',
  previewImage: 'https://example.com/preview.jpg',
  previewVideoLink: 'https://example.com/preview.mp4'
}];
const store = mockStore({
  film: {}, films: {list: mockFilms}, authorization: {}, genre: {}, player: {}
});
const wrapper = ({children}: { children: JSX.Element }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('useFilms hook', () => {
  it('should return the value from useAppSelector', () => {
    const {result} = renderHook(() => useFilms(), {wrapper});
    expect(result.current).toEqual(mockFilms);
  });
});
