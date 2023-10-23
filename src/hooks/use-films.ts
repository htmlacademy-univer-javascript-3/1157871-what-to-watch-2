import {useAppSelector} from 'src/store';

export function useFilms() {
  return useAppSelector((state) => state.films);
}
