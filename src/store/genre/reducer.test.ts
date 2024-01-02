import {genre} from './reducer';
import {changeGenre} from './actions';


describe('genre reducer', () => {
  const initialState = {
    genre: 'GENRE_FOR_ALL_FILMS',
  };

  it('should handle changeGenre action', () => {
    const newGenre = 'Action';
    const action = changeGenre(newGenre);
    const newState = genre(initialState, action);

    expect(newState.genre).toEqual(newGenre);
  });
});
