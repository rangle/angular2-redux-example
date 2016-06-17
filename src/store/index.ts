import { Map, fromJS } from 'immutable';

import logger from './configure-logger';

const persistState = require('redux-localstorage');

export const enhancers = [
  persistState('session', {
    key: 'angular2-redux-seed',

    serialize: (store) => {
      if (store == null || store.session == null) {
        return store;
      }

      return JSON.stringify(store.session.toJS());
    },

    deserialize: (state) => ({
      session: state ? fromJS(JSON.parse(state)) : fromJS({}),
    }),
  })
];

export const middleware = [];

declare const __DEV__: boolean; // from webpack
if (__DEV__) {
  middleware.push(logger);

  const environment: any = window || this;
  if (environment.devToolsExtension) {
    enhancers.push(environment.devToolsExtension());
  }
}
