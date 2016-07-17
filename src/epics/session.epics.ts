import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import { SessionActions } from '../actions/session.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const BASE_URL = '/api';

@Injectable()
export class SessionEpics {
  constructor(private http: Http) {}

  login = (action$: ActionsObservable) => {
    return action$.ofType(SessionActions.LOGIN_USER)
      .flatMap(({payload}) => {
        return this.http.post(`${BASE_URL}/auth/login`, payload)
          .map(result => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: result.json().meta
          }))
          .catch(error => Observable.of({
            type: SessionActions.LOGIN_USER_ERROR
          }));
        });
  }
}
