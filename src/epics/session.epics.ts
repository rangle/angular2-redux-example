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
const AUTH_URL = 'https://httpbin.org/basic-auth/user/pass';
const FAKE_USER_DATA = {
  id: 'user',
  token: 'abcd1234',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
  }
};

@Injectable()
export class SessionEpics {
  constructor(private http: Http) {}

  login = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter<IPayloadAction>(({ type }) => type === SessionActions.LOGIN_USER)
      .mergeMap<IPayloadAction, IPayloadAction>(({ payload }) => {
        return this.doAuthRequest(payload.username, payload.password)
          .map<Response, IPayloadAction>(result => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: FAKE_USER_DATA,
          }))
          .catch<any, Action>(() => Observable.of({
            type: SessionActions.LOGIN_USER_ERROR
          }));
        });
  }

  doAuthRequest(username, password) {
    const options = new RequestOptions({
      headers: new Headers({
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    });

    return this.http.get(AUTH_URL, options);
  }
}
