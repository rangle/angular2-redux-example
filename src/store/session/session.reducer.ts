import { IPayloadAction } from '../../actions';
import { SessionActions } from '../../actions/session.actions';
import { ISessionRecord } from './session.types';
import {
  INITIAL_STATE,
  INITIAL_USER_STATE,
  UserFactory,
} from './session.initial-state';


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
    return state.merge({
      token: action.payload.token,
      user: UserFactory(action.payload.profile),
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
