import { LoginService } from './login';
import isPromise from '../utils/is-promise';

import {
  fit,
  it,
  xit,
  fdescribe,
  describe,
  expect,
  inject,
  async,
  beforeEach,
  beforeEachProviders
} from '@angular/core/testing';

describe('LoginService tests', () => {

  beforeEachProviders(() => {
    return [
      LoginService
    ];
  });
  

  it('should return a promise', () => {
    const loginService = new LoginService();
    let loginPromise = loginService.login('user', 'pass');
    let payload = {promise: loginPromise};
    expect(isPromise(payload)).toBe(true);
  });

  it('should login successfully',
    async(inject([ LoginService ], (loginService: LoginService) => {
      loginService.login('user', 'pass')
      .then((data) => {
        expect(data).not.toBeUndefined();
      });
  })));

  it('should try login unsuccessfully (invalid user)',
  async(inject([ LoginService ], (loginService: LoginService) => {
    loginService.login('fakeuser', 'fakepass')
    .then((data) => {
      expect(data).toBeUndefined();
    })
    .then(null, (err) => {
      expect(err).not.toBeUndefined();
    });
  })));

  it('should try login unsuccessfully (wrong password)',
  async(inject([ LoginService ], (loginService: LoginService) => {
    loginService.login('user', 'wrongpass')
    .then((data) => {
      expect(data).toBeUndefined();
    })
    .then(null, (err) => {
      expect(err).not.toBeUndefined();
    });
  })));
});
