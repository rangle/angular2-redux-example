import { IAppState, rootReducer, deimmutify, reimmutify } from './store';
import { ICounter } from './counter';
import { ISession } from './session';

import {dev} from '../configuration';

const createLogger = require('redux-logger');
const persistState = require('redux-localstorage');

export {
  IAppState,
  ISession,
  ICounter,
  rootReducer,
  reimmutify,
};

export let middleware = [];
export let enhancers = [
  persistState(
    '',
    {
      key: 'angular2-redux-seed',
      serialize: store => JSON.stringify(deimmutify(store)),
      deserialize: state => reimmutify(JSON.parse(state)),
    })
];

if (dev) {
  middleware.push(
    createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: deimmutify,
  }));

  const environment: any = window || this;
  if (environment.devToolsExtension) {
    enhancers.push(environment.devToolsExtension());
  }
}
