import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {FilmsList} from './films-list';


describe('FilmsList component', () => {
  const films = [
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

  it('should render film cards based on the films prop', () => {
    const {getByText} = render(<BrowserRouter><FilmsList films={films}/></BrowserRouter>);
    const film1 = getByText(films[0].name);
    const film2 = getByText(films[1].name);
    expect(film1).toBeInTheDocument();
    expect(film2).toBeInTheDocument();
  });
});
