import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from 'src/constants';


const Actions = {
  UPDATE_AUTHORIZATION_STATUS: 'authorization/updateStatus'
} as const;

export const updateAuthorizationStatus = createAction(
  Actions.UPDATE_AUTHORIZATION_STATUS,
  (value: AuthorizationStatus): { payload: AuthorizationStatus } => ({
    payload: value
  })
);
