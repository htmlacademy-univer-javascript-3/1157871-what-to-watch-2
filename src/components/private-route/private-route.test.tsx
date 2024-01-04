import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from 'src/api';
import {State} from 'src/store/types';
import {PrivateRoute} from './private-route';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {}, authorization: {}, genre: {}, player: {}
});
describe('PrivateRoute component', () => {

  it('should render children if user is authorized', () => {

    const {queryByText} = render(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute>
            <div>Private content</div>
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(queryByText('Private content')).toBeInTheDocument();
    expect(queryByText('Login page')).not.toBeInTheDocument();
  });
});
