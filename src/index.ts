import 'reflect-metadata';
import 'babel-polyfill';
import 'core-js/es6';
import 'core-js/es7/reflect';
import '../shims/shims_for_IE';
import 'zone.js/dist/zone';
import 'ts-helpers';

import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common/index';
import { NgRedux } from 'ng2-redux';

import { RioSampleApp } from './containers/sample-app';
import { SessionActions } from './actions/session';
import { CounterActions } from './actions/counter';
import { AuthService } from './services/auth/';
import { ServerService } from './services/server/';

declare const __PRODUCTION__: boolean;
declare const __TEST__: boolean;

if (__PRODUCTION__) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

if (!__TEST__) {
  bootstrap(RioSampleApp, [
    NgRedux,
    SessionActions,
    CounterActions,
    AuthService,
    ServerService,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' })
  ]);
}
