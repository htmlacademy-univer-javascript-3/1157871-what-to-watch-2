import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchFilm, fetchFilmSimilar} from 'src/store/film/api';
import {ReduxStateStatus, RoutePathname} from 'src/constants';
import {useAppDispatch} from 'src/store/hooks';


export function useFetchFilm(id: string) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFilmSimilar(id));
    dispatch(fetchFilm(id))
      .then((res) => {
        if (res.meta.requestStatus === ReduxStateStatus.rejected) {
          navigate(`/${RoutePathname.notFound}`);
        }
      });
  }, [id, navigate, dispatch]);
}
