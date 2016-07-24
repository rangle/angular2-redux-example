import { IPayloadAction } from '../../actions';
import { SessionActions } from '../../actions/session.actions';
import {
  IUser,
  IUserRecord,
  ISessionRecord,
} from './session.types';
import {
  INITIAL_STATE,
  INITIAL_USER_STATE,
} from './session.initial-state';
import { immutify } from '../record.factory';

export function sessionReducer(
  state: ISessionRecord = INITIAL_STATE,
  action: IPayloadAction): ISessionRecord {

  switch (action.type) {
  case SessionActions.LOGIN_USER:
    return state.merge({
      token: null,
      user: INITIAL_USER_STATE,
      hasError: false,
      isLoading: true,
    });

  case SessionActions.LOGIN_USER_SUCCESS:
    let user = null;
    if (action.payload.profile) {
      user = immutify<IUser, IUserRecord>(action.payload.profile);
    }
    return state.merge({
      token: action.payload.token,
      user: user,
      hasError: false,
      isLoading: false,
    });

  case SessionActions.LOGIN_USER_ERROR:
    return state.merge({
      token: null,
      user: INITIAL_USER_STATE,
      hasError: true,
      isLoading: false,
    });

  case SessionActions.LOGOUT_USER:
    return INITIAL_STATE;

  default:
    return state;
  }
}
