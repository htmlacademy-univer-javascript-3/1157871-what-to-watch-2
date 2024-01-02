import {TComment, TFilm, TFilmCard, TFilmPromo} from 'src/types';
import {updateFilm, updateFilmComments, updateFilmsSimilar, updatePromoFilm} from './actions';
import {film} from './reducer';


describe('film reducer', () => {
  const initialState = {
    promo: null,
    film: null,
    similar: null,
    comments: null
  };

  it('should handle updatePromoFilm action', () => {
    const promofilm: TFilmPromo = {
      backgroundImage: 'https://example.com/background.jpg',
      genre: 'Action',
      id: '12345',
      isFavorite: false,
      name: 'Example Movie',
      posterImage: 'https://example.com/poster.jpg',
      released: 2022,
      videoLink: 'https://example.com/video.mp4'
    };
    const action = updatePromoFilm(promofilm);
    const newState = film(initialState, action);
    expect(newState.promo).toEqual(promofilm);
  });

  it('should handle updateFilm action', () => {
    const filmData: TFilm = {
      backgroundColor: '#000000',
      backgroundImage: 'https://example.com/background.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      director: 'John Doe',
      genre: 'Action',
      id: '12345',
      isFavorite: false,
      name: 'Example Movie',
      posterImage: 'https://example.com/poster.jpg',
      rating: 7.8,
      released: 2022,
      runTime: 120,
      scoresCount: 100,
      starring: ['Actor 1', 'Actor 2'],
      videoLink: 'https://example.com/video.mp4'
    };
    const action = updateFilm(filmData);
    const newState = film(initialState, action);

    expect(newState.film).toEqual(filmData);
  });

  it('should handle updateFilmsSimilar action', () => {
    const similarFilms: TFilmCard[] = [{
      genre: 'Drama',
      id: '12345',
      name: 'Example Movie',
      previewImage: 'https://example.com/preview.jpg',
      previewVideoLink: 'https://example.com/preview.mp4'
    }];
    const action = updateFilmsSimilar(similarFilms);
    const newState = film(initialState, action);

    expect(newState.similar).toEqual(similarFilms);
  });

  it('should handle updateFilmComments action', () => {
    const comments: TComment[] = [{
      comment: 'Great movie!',
      date: '2022-01-01',
      id: '12345',
      rating: 5,
      user: 'John Doe'
    }];
    const action = updateFilmComments(comments);
    const newState = film(initialState, action);

    expect(newState.comments).toEqual(comments);
  });
});
