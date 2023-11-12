import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {store} from 'src/store';
import {Main} from 'src/pages/main';
import {SignIn} from 'src/pages/sign-in';
import {MyList} from 'src/pages/my-list';
import {Film} from 'src/pages/film';
import {AddReview} from 'src/pages/add-review';
import {Player} from 'src/pages/player';
import {NotFound} from 'src/pages/not-found';
import {ScrollToTop} from 'src/components/scroll-to-top';
import {RoutePathname} from 'src/constants';
import {CheckAuth} from 'src/components/check-auth';
import {TPlayer} from 'src/types';


type Props = {
  player: TPlayer
};

function Router(props: Props) {
  const {player} = props;
  return (
    <SnackbarProvider>

      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path={RoutePathname.MAIN}>
              <Route
                index
                element={<Main/>}
              />
              <Route
                path={RoutePathname.LOGIN}
                element={<SignIn/>}
              />
              <Route
                path={RoutePathname.MY_LIST}
                element={<CheckAuth><MyList/></CheckAuth>}
              />
              <Route
                path={`${RoutePathname.FILMS}/:id`}
                element={<Film/>}
              />
              <Route
                path={`${RoutePathname.FILMS}/:id/${RoutePathname.REVIEW}`}
                element={<AddReview/>}
              />
              <Route
                path={RoutePathname.PLAYER}
                element={<Player {...player}/>}
              />
            </Route>
            <Route path={RoutePathname.NOT_FOUND} element={<NotFound/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export function App(props: Props) {
  const {player} = props;
  return (
    <Provider store={store}>
      <Router player={player}/>
    </Provider>
  );
}
