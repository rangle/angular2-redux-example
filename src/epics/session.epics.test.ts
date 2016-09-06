import {
  async,
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
  beforeEach(() => {
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

    return configureTests(configure);
  });

  it(
    'should process a successful login',
    async(
      inject([
        XHRBackend,
        SessionEpics
      ], (mockBackend, sessionEpics) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                  body: {
                    meta: {
                      token: '123',
                      user: {
                        firstName: 'John',
                        lastName: 'Doe'
                      }
                    }
                  }
                }
              )
            ));
          });

        const action$ = Observable.of({type: SessionActions.LOGIN_USER});
        sessionEpics.login(action$)
          .subscribe(
            action => expect(action).toEqual({
              type: SessionActions.LOGIN_USER_SUCCESS,
              payload: {
                token: '123',
                user: {
                  firstName: 'John',
                  lastName: 'Doe'
                }
              }
            })
          );
      })));

  it(
    'should process a login error',
    async(inject([
      XHRBackend,
      SessionEpics
    ], (mockBackend, sessionEpics) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockError(new Error('some error'));
        });

      const action$ = Observable.of({type: SessionActions.LOGIN_USER});
      sessionEpics.login(action$)
        .subscribe(
          action => expect(action).toEqual({
            type: SessionActions.LOGIN_USER_ERROR
          }));
    })));
});
