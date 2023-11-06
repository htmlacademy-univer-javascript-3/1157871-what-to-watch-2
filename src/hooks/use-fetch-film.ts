import {useEffect} from 'react';
import {fetchFilm, fetchFilmSimilar} from 'src/store/api.ts';
import {ReduxStateStatus, RoutePathname} from 'src/constants.ts';
import {useAppDispatch} from 'src/store';
import {useNavigate} from 'react-router-dom';

export function useFetchFilm(id: string) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFilmSimilar(id));
    dispatch(fetchFilm(id))
      .then((res) => {
        if (res.meta.requestStatus === ReduxStateStatus.rejected) {
          navigate(`/${RoutePathname.NOT_FOUND}`);
        }
      });
  }, [id, navigate, dispatch]);
}
