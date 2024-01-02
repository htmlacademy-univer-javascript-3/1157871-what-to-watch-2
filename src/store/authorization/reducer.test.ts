import {AuthorizationStatus} from 'src/constants';
import {updateAuthorizationStatus} from './actions';
import {authorization} from './reducer';


describe('authorization reducer', () => {
  it('should handle updateAuthorizationStatus', () => {
    const action = updateAuthorizationStatus(AuthorizationStatus.authorized);
    const newState = authorization({status: null}, action);
    expect(newState).toEqual({status: AuthorizationStatus.authorized});
  });

  it('should not mutate the original state', () => {
    const action = updateAuthorizationStatus(AuthorizationStatus.authorized);
    const state = {status: null};
    const newState = authorization(state, action);
    expect(newState).toEqual({status: AuthorizationStatus.authorized});
    expect(state).toEqual({status: null});
  });
});
