import 'reflect-metadata';
import 'babel-polyfill';
import 'core-js/es6';
import 'core-js/es7/reflect';
import '../shims/shims_for_IE';
import 'zone.js/dist/zone';
import 'ts-helpers';
import 'rxjs/add/operator/map';

import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { NgRedux } from 'ng2-redux';

import { provideRouter } from '@angular/router';
import { SAMPLE_APP_ROUTES } from './routes/sample-app';

import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { RioSampleApp } from './containers/sample-app';
import { SessionActions } from './actions/session';
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
    AuthService,
    ServerService,
    HTTP_PROVIDERS,
    provideRouter(SAMPLE_APP_ROUTES),
    disableDeprecatedForms(),
    provideForms()
  ]);
}
