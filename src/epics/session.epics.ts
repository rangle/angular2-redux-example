import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  Headers,
} from '@angular/http';
import { IPayloadAction, SessionActions } from '../actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import { Action } from 'redux';

import 'rxjs/add/operator/do';

// A fake API on the internets: see http://httpbin.org.
// Credentials are 'user', 'pass' :)
const AUTH_URL = 'https://httpbin.org/basic-auth/user/pass';
const USER_DATA_URL = 'http://www.mocky.io/v2/58aa539210000034064b6214';

export interface IUserData {
  id: string;
  token: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}

@Injectable()
export class SessionEpics {
  constructor(private http: Http) {}

  login = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter<IPayloadAction>(({ type }) => type === SessionActions.LOGIN_USER)
      .mergeMap<IPayloadAction, IPayloadAction>(({ payload }) =>
        this.doAuthRequest(payload.username, payload.password)
          .map<IUserData, Action>(userData => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: userData,
          }))
          .catch<any, IPayloadAction>(error => Observable.of({
            type: SessionActions.LOGIN_USER_ERROR,
            error,
          })));
  }

  doAuthRequest(username, password): Observable<IUserData> {
    // Note that this is intended as an example of how to do HTTP with a
    // redux-observable epic. It's NOT INTENDED AS A GOOD EXAMPLE OF SECURING
    // A SITE WITH AUTHENTICATION! For one thing, the user data isn't protected.
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    });

    return this.http.get(AUTH_URL, options)
      .mergeMap(response => this.http.get(USER_DATA_URL))
      .map(response => response.json());
  }
}
