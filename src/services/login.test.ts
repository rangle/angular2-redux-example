import { LoginService } from './login';
import isPromise from '../utils/is-promise';
//import 'zone.js/dist/async-test';

// require('zone.js/dist/zone');
// require('zone.js/dist/jasmine-patch');
// require('zone.js/dist/sync-test');
// require('zone.js/dist/async-test');
// require('zone.js/dist/fake-async-test');

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
// import {
//   ComponentFixture,
//   TestComponentBuilder
// } from '@angular/compiler/testing';
// import { By } from '@angular/platform-browser';
// import { Injectable, Component, provide } from '@angular/core';

describe('LoginService tests', () => {
  // let builder;

  beforeEachProviders(() => {
    return [
      LoginService
    ];
  });

  // beforeEach(inject([TestComponentBuilder], (tcb) => {
  //   builder = tcb;
  // }));
  
  it('should be null', () => {
    console.log('am i here?');
    expect( null ).toBeNull();
  });

  it('should be 4', () => {
    console.log('am i here?');
    expect( 2*2 ).toBe(4);
  });

  it('should return a promise', () => {
    console.log('test 10');
    const loginService = new LoginService();
    console.log('test 11');
    let loginPromise = loginService.login('user', 'pass');
    console.log('test 12');
    let payload = {promise: loginPromise};
    console.log('test 13');
    expect(isPromise(payload)).toBe(true);
    console.log('test 14');
  });

  it('should show that async is working', 
    async(inject([  ], () => {
      let somePromise = new Promise<string>((resolve, reject) => { 
        resolve('a string'); 
      });
      somePromise
      .then((data) => {
        expect( null ).toBeNull();
      });
  })));

  it('should login successfully',
    async(inject([ LoginService ], (loginService: LoginService) => {
      //let loginService = new LoginService();
      loginService.login('user', 'pass')
      .then((data)=>{
        //success
        expect(data).not.toBeUndefined();
        
      });

  })));

  it('should try login unsuccessfully (invalid user)',
  async(inject([ LoginService ], (loginService: LoginService) => {
    loginService.login('fakeuser', 'fakepass')
    .then((data)=>{
      expect(data).toBeUndefined();
    })
    .then(null, (err) =>{
      expect(err).not.toBeUndefined();
    });
  })));

  it('should try login unsuccessfully (wrong password)',
  async(inject([ LoginService ], (loginService: LoginService) => {
    loginService.login('user', 'wrongpass')
    .then((data)=>{
      expect(data).toBeUndefined();
    })
    .then(null, (err) =>{
      expect(err).not.toBeUndefined();
    });
  })));

});
