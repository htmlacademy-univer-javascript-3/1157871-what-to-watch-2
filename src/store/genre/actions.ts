import {createAction} from '@reduxjs/toolkit';


const Actions = {
  CHANGE_GENRE: 'genre/change',
};

export const changeGenre = createAction(
  Actions.CHANGE_GENRE,
  (value: string): { payload: string } => ({
    payload: value
  })
);
