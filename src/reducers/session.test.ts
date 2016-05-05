import * as assert from 'assert';
import fireAction from '../utils/fire-action';
import sessionReducer from '../reducers/session';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../../src/constants/index';

import { Map } from 'immutable';

let state = sessionReducer();

describe('Session Reducer', () => {
  describe('inital state', () => {
    it('should be a Map', () => {
      expect(Map.isMap(state)).toBe(true);
    });
  });

  describe('on LOGIN_USER_PENDING', () => {
    it('should set loading to true', () => {
      state = fireAction(sessionReducer, state, LOGIN_USER_PENDING);
      expect(state.get('isLoading')).toBeTruthy;
      expect(state.get('token')).toEqual(null);
    });
  });

  describe('on LOGIN_USER_SUCCESS', () => {
    it('should save the user token', () => {
      state = fireAction(
        sessionReducer,
        state,
        LOGIN_USER_SUCCESS,
        { token: 1234 });

      expect(state.get('isLoading')).toBeFalsy;
      expect(state.get('hasError')).toBeFalsy;
      expect(state.get('token')).toEqual(1234);
    });
  });

  describe('on LOGIN_USER_ERROR', () => {
    it('should set loading to be false', () => {
      state = fireAction(sessionReducer, state, LOGIN_USER_ERROR);

      expect(state.get('isLoading')).toBeFalsy;
      expect(state.get('hasError')).toBeTruthy;
    });
  });


  describe('on LOGOUT_USER', () => {
    it('should wipe out the user token', () => {
      state = fireAction(sessionReducer, state, LOGOUT_USER);

      expect(state.get('isLoading')).toBeTruthy;
      expect(state.get('hasError')).toBeFalsy;
      expect(state.get('token')).toEqual(null);
    });
  });
});
