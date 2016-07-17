import { Map } from 'immutable';
import { IPayloadAction } from '../../actions';
import { SessionActions } from '../../actions/session.actions';
import { ISession, IUser, UserRecord } from './session.types';
import { INITIAL_STATE } from './session.initial-state';

export function sessionReducer(
  state: ISession = INITIAL_STATE,
  action: IPayloadAction): ISession {

  switch (action.type) {
  case SessionActions.LOGIN_USER:
    return state.merge({
      token: null,
      user: UserRecord({}),
      hasError: false,
      isLoading: true,
    });

  case SessionActions.LOGIN_USER_SUCCESS:
    return state.merge({
      token: action.payload.token,
      user: UserRecord(action.payload.profile),
      hasError: false,
      isLoading: false,
    });

  case SessionActions.LOGIN_USER_ERROR:
    return state.merge({
      token: null,
      user: UserRecord({}),
      hasError: true,
      isLoading: false,
    });

  case SessionActions.LOGOUT_USER:
    return INITIAL_STATE;

  default:
    return state;
  }
}
