import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

import { enableProdMode, provide } from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common/index';
import { provider, NgRedux } from 'ng2-redux';

import configureStore from './store/configure-store';
import { RioSampleApp } from './containers/sample-app';
import { SessionActions } from './actions/session';
import { CounterActions } from './actions/counter';
import { LoginService } from './services/login';

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
  LoginService,
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '/' })
]);
