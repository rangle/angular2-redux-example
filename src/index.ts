import 'reflect-metadata';
import 'babel-polyfill';
import 'core-js/es6';
import 'core-js/es7/reflect';
import '../shims/shims_for_IE';
import 'zone.js/dist/zone';
import 'ts-helpers';

import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { NgRedux } from 'ng2-redux';
import { RioSampleApp, SAMPLE_APP_ROUTES } from './app';
import { ACTION_PROVIDERS } from './actions';
import { EPIC_PROVIDERS } from './epics';

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
    ACTION_PROVIDERS,
    EPIC_PROVIDERS,
    HTTP_PROVIDERS,
    provideRouter(SAMPLE_APP_ROUTES),
    disableDeprecatedForms(),
    provideForms()
  ]);
}
