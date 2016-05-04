import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from '../constants';

@Injectable()
export class SessionActions {
  constructor(private authService: AuthService) {}

  loginUser(credentials) {
    return (dispatch, getState) => {
      const username = credentials.username;
      const password = credentials.password;

      return dispatch({
        types: [
          LOGIN_USER_PENDING,
          LOGIN_USER_SUCCESS,
          LOGIN_USER_ERROR,
        ],
        payload: {
          promise: this.authService.login(username, password)
        },
      });
    };
  }

  logoutUser() {
    return {
      type: LOGOUT_USER,
    };
  }
}
