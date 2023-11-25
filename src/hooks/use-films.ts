import {useAppSelector} from 'src/store/hooks';
import {FilmsSelector} from 'src/store/films/selectors';

export function useFilms() {
  return useAppSelector(FilmsSelector.list);
}
