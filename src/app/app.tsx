import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Main} from 'src/pages/main';
import {SignIn} from 'src/pages/sign-in';
import {MyList} from 'src/pages/my-list';
import {Film} from 'src/pages/film';
import {AddReview} from 'src/pages/add-review';
import {Player} from 'src/pages/player';
import {NotFound} from 'src/pages/not-found';
import {ScrollToTop} from 'src/components/scroll-to-top';
import {RoutePathname} from 'src/constants';
import {TFilmCard, TPlayer} from 'src/types';
import {CheckAuth} from 'src//components/check-auth';


type Props = {
  films: TFilmCard[],
  player: TPlayer
};

export function App(props: Props) {
  const {films, player} = props;
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path={RoutePathname.MAIN}>
            <Route
              index
              element={<Main films={films}/>}
            />
            <Route
              path={RoutePathname.LOGIN}
              element={<SignIn/>}
            />
            <Route
              path={RoutePathname.MY_LIST}
              element={<CheckAuth><MyList films={films}/></CheckAuth>}
            />
            <Route
              path={`${RoutePathname.FILMS}/:id`}
              element={<Film films={films} />}
            />
            <Route
              path={`${RoutePathname.FILMS}/:id/${RoutePathname.REVIEW}`}
              element={<AddReview films={films}/>}
            />
            <Route
              path={`${RoutePathname.PLAYER}`}
              element={<Player {...player}/>}
            />
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}
