import {
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import {
  HttpModule,
  XHRBackend,
  ResponseOptions,
  Response
} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {SessionActions} from '../actions/session.actions';
import {SessionEpics} from './session.epics';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing/mock_backend';
import {configureTests} from '../tests.configure';

describe('SessionEpics', () => {
  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          {
            provide: XHRBackend,
            useClass: MockBackend
          },
          SessionEpics
        ]
      });
    };

    configureTests(configure).then(done);
  });

  it(
    'should process a successful login',
    fakeAsync(
      inject([
        XHRBackend,
        SessionEpics
      ], (mockBackend, sessionEpics) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                  body: {
                    id: 'user',
                    token: 'abcd1234',
                    profile: {
                      firstName: 'John',
                      lastName: 'Doe'
                    }
                  }
                }
              )
            ));
          });

        const action$ = Observable.of({
          type: SessionActions.LOGIN_USER,
          payload: {
            username: 'user',
            password: 'pass',
          },
        });
        sessionEpics.login(action$)
          .subscribe(
            action => expect(action).toEqual({
              type: SessionActions.LOGIN_USER_SUCCESS,
              payload: {
                id: 'user',
                token: 'abcd1234',
                profile: {
                  firstName: 'John',
                  lastName: 'Doe'
                }
              }
            })
          );
      })));

  it(
    'should process a login error',
    fakeAsync(inject([
      XHRBackend,
      SessionEpics
    ], (mockBackend, sessionEpics) => {
      const error = new Error('some error');
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockError(error);
        });

      const action$ = Observable.of({
        type: SessionActions.LOGIN_USER,
          payload: {
            username: 'user',
            password: 'pass',
          },
      });

      sessionEpics.login(action$)
        .subscribe(
          action => expect(action).toEqual({
            type: SessionActions.LOGIN_USER_ERROR,
            error,
          }));
    })));
});
