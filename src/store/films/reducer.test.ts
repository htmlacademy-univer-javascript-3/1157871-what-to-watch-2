import {TFilmCard} from 'src/types';
import {updateFavoriteFilms, updateFilms} from './actions';
import {films} from './reducer';


const MOCK_FILM: TFilmCard = {
  genre: 'Drama',
  id: '12345',
  name: 'Example Movie',
  previewImage: 'https://example.com/preview.jpg',
  previewVideoLink: 'https://example.com/preview.mp4'
};

describe('films reducer', () => {
  const initialState = {
    list: null,
    favorite: null,
  };

  it('should handle updateFilms action', () => {
    const filmList = [MOCK_FILM, MOCK_FILM];
    const action = updateFilms(filmList);
    const newState = films(initialState, action);

    expect(newState.list).toEqual(filmList);
  });

  it('should handle updateFavoriteFilms action', () => {
    const favoriteFilms = [MOCK_FILM, MOCK_FILM];
    const action = updateFavoriteFilms(favoriteFilms);
    const newState = films(initialState, action);

    expect(newState.favorite).toEqual(favoriteFilms);
  });
});
