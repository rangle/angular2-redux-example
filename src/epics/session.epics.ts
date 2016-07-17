import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPayloadAction, SessionActions } from '../actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

const BASE_URL = '/api';

@Injectable()
export class SessionEpics {
  constructor(private http: Http) {}

  login = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === SessionActions.LOGIN_USER)
      .flatMap(({ payload }) => {
        return this.http.post(`${BASE_URL}/auth/login`, payload)
          .map(result => ({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: result.json().meta
          }))
          .catch(error => {
            return Observable.of({
              type: SessionActions.LOGIN_USER_ERROR
            });
          });
        });
  }
}
