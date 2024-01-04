import {JSX} from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {renderHook} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from 'src/api';
import {State} from 'src/store/types';
import {usePlayer} from './use-player';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  film: {}, films: {}, authorization: {}, genre: {}, player: {}
});
const wrapper = ({children}: { children: JSX.Element }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('usePlayer hook', () => {

  it('should update progress state when handleTimeUpdate is called', () => {
    const {result} = renderHook(() => usePlayer(), {wrapper});

    expect(result.current.progress).toBe(0);
  });
});
