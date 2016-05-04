import 'core-js/es6';
import 'core-js/es7/reflect';
import '../shims/shims_for_IE';
require('zone.js/dist/zone');

import 'ts-helpers';

import { enableProdMode, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common/index';
import { provider, NgRedux } from 'ng2-redux';

import configureStore from './store/configure-store';
import { RioSampleApp } from './containers/sample-app';
import { SessionActions } from './actions/session';
import { CounterActions } from './actions/counter';
import { AUTH_PROVIDERS } from './services/auth/';
import { SERVER_PROVIDERS } from './services/server/';

const store = configureStore({});
declare let __PRODUCTION__: any;

if (__PRODUCTION__) {
  enableProdMode();
} else {
  require('zone.js/dist/long-stack-trace-zone');
}

bootstrap(RioSampleApp, [
  provider(store),
  SessionActions,
  CounterActions,
  AUTH_PROVIDERS,
  SERVER_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' })
]);
