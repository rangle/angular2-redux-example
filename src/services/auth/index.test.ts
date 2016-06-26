import {
  it,
  xit,
  describe,
  expect,
  inject,
  async,
  beforeEach,
  beforeEachProviders
} from '@angular/core/testing';

import {provide} from '@angular/core';

import {AuthService} from './index';
import isPromise from '../../utils/is-promise';
import {Observable} from 'rxjs/Observable';

describe('Testing authentication service', () => {
  let _mockServerService;
  let authService;
  let credentials = {
    id: '1',
    username: 'user',
    password: 'pass',
    name: 'testuser',
  };

  beforeEach(() => {
    _mockServerService = {
      post: (path, data) => {
        return new Observable(observer => {
          if (data.username === credentials.username
            && data.password === credentials.password) {
            setTimeout(() => {
              observer.next({ meta: {
                id: credentials.id,
                name: credentials.name,
              } });
              observer.complete();
            }, 1500);
          } else {
            setTimeout(() => {
              observer.error('Invalid login attempt');
            }, 1500);
          }
        });
      }
    };
  });

  beforeEach (() => {
    authService = new AuthService(_mockServerService);
  });

  it('should return a promise', () => {
    let loginPromise = authService.login('user', 'pass');
    let payload = {promise: loginPromise};
    expect(isPromise(payload)).toBe(true);
  });

  it('should login successfully', async(() => {
    authService.login('user', 'pass')
    .then((data) => {
      expect(data).not.toBeUndefined();
      expect(data).toEqual({id: credentials.id, name: credentials.name});
    });
  }));

  it('should not login successfully when a password is missing',
   async(() => {
    authService.login('user')
    .then((data) => {
      expect(data).toBeUndefined();
    })
    .then(null, (err) => {
      expect(err).not.toBeUndefined();
    });
  }));

  it('should not login successfully with an invalid username',
   async(() => {
    authService.login('invalidUser', 'pass')
    .then((data) => {
      expect(data).toBeUndefined();
    })
    .then(null, (err) => {
      expect(err).not.toBeUndefined();
    });
  }));

  it('should not login successfully with an invalid password',
   async(() => {
    authService.login('user', 'invalidPass')
    .then((data) => {
      expect(data).toBeUndefined();
    })
    .then(null, (err) => {
      expect(err).not.toBeUndefined();
    });
  }));

});
