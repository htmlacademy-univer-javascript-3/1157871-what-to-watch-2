import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render} from '@testing-library/react';
import {RoutePathname} from 'src/constants';
import {createAPI} from 'src/api';
import {State} from 'src/store/types';
import {Header} from './header';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {}, authorization: {}, genre: {}, player: {}
});

describe('Header component', () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
        </BrowserRouter>
      </Provider>
    );

  it('should render the logo with the correct link and letters', () => {
    const {getByText, getByRole} = renderComponent();

    const logoLink = getByRole('link');
    expect(logoLink.getAttribute('href')).toBe(RoutePathname.main);

    const letter2 = getByText('T');
    expect(letter2).toBeInTheDocument();
  });
});
