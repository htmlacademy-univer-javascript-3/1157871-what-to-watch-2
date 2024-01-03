import {BrowserRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import {ScrollToTop} from './scroll-to-top';
import {createAPI} from 'src/api.ts';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from 'src/store/types.ts';
import {Provider} from 'react-redux';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {}, authorization: {}, genre: {}, player: {}
});

describe('ScrollToTop component', () => {
  const mockChild = <div>Scroll to top</div>;

  it('should render children', () => {
    const {getByText} = render(
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>{mockChild}</ScrollToTop>
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Scroll to top')).toBeInTheDocument();
  });
});
