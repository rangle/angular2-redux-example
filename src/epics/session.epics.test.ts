import { addProviders, fakeAsync, inject } from '@angular/core/testing';
import { provide } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { SessionActions } from '../actions/session.actions';
import { SessionEpics } from './session.epics';

const mockHttp = <Http>{};

describe('SessionEpics', () => {
   beforeEach(() => {
     addProviders([
       SessionEpics,
       provide(Http, { useValue: mockHttp }),
     ]);
  });

  it(
    'should process a successful login',
    fakeAsync(inject([SessionEpics], sessionEpics => {

      mockHttp.post = jasmine.createSpy('post')
        .and.returnValue(Observable.of({
          json: () => ({
            meta: {
              token: '123',
              user: { firstName: 'John', lastName: 'Doe' }
            }
          })
        }));

      const action$ = Observable.of({ type: SessionActions.LOGIN_USER });
      sessionEpics.login(action$)
        .subscribe(
          action => expect(action).toEqual({
            type: SessionActions.LOGIN_USER_SUCCESS,
            payload: {
              token: '123',
              user: { firstName: 'John', lastName: 'Doe' }
            }
          }));
    })));

  it(
    'should process a login error',
    fakeAsync(inject([SessionEpics], sessionEpics => {

      mockHttp.post = jasmine.createSpy('post')
        .and.returnValue(Observable.throw(new Error('It failed')));

      const action$ = Observable.of({ type: SessionActions.LOGIN_USER });
      sessionEpics.login(action$)
        .subscribe(
          action => expect(action).toEqual({
            type: SessionActions.LOGIN_USER_ERROR
          }));
    })));
});
