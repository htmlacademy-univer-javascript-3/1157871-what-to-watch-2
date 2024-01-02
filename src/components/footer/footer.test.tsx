import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Footer} from './footer';


describe('Footer component', () => {
  it('should render the copyright text', () => {
    const {getByText} = render(
      <BrowserRouter>
        <Footer/>
      </BrowserRouter>
    );

    const copyrightText = getByText('© 2019 What to watch Ltd.');
    expect(copyrightText).toBeInTheDocument();
  });
});
