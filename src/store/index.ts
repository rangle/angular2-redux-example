import { Map, fromJS } from 'immutable';
import { IAppState, rootReducer, deimmutify, reimmutify } from './store';
import { ICounter } from './counter';
import { ISession } from './session';

const createLogger = require('redux-logger');
const persistState = require('redux-localstorage');
declare const __DEV__: boolean; // from webpack

export {
  IAppState,
  ISession,
  ICounter,
  rootReducer,
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

if (__DEV__) {
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
