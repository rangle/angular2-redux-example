import { Iterable } from 'immutable';
import { ISessionRecord } from './session.types';
import { sessionReducer } from './session.reducer';
import { SessionActions } from '../../actions/session.actions';

describe('Session Reducer', () => {
  let initState: ISessionRecord;

  beforeEach(() => {
    initState = sessionReducer(undefined, { type: 'TEST_INIT'});
  });

  it('should have an immutable initial state', () => {
    expect(Iterable.isIterable(initState)).toBe(true);
  });

  it('should set loading to true on LOGIN_USER_PENDING', () => {
    const nextState = sessionReducer(
      initState,
      { type: SessionActions.LOGIN_USER });
    expect(nextState.get('isLoading')).toBeTruthy;
    expect(nextState.get('token')).toEqual(null);
  });

  it('should save the user token on LOGIN_USER_SUCCESS', () => {
    const nextState = sessionReducer(
      initState,
      {
        type: SessionActions.LOGIN_USER_SUCCESS,
        payload: { token: 1234 }
      }
    );
    expect(nextState.get('isLoading')).toBeFalsy;
    expect(nextState.get('hasError')).toBeFalsy;
    expect(nextState.get('token')).toEqual(1234);
  });

  it('should flag an error on LOGIN_USER_ERROR', () => {
    const nextState = sessionReducer(
      initState,
      { type: SessionActions.LOGIN_USER_ERROR });
    expect(nextState.get('isLoading')).toBeFalsy;
    expect(nextState.get('hasError')).toBeTruthy;
  });

  it('should clear user data on LOGOUT_USER', () => {
    const nextState = sessionReducer(
      initState,
      { type: SessionActions.LOGOUT_USER });
    expect(nextState.get('isLoading')).toBeTruthy;
    expect(nextState.get('hasError')).toBeFalsy;
    expect(nextState.get('token')).toEqual(null);
  });
});
