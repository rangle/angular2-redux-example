import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import * as counter from './counter';
import * as session from './session';


export interface IAppState {
  counter?: counter.ICounter;
  session?: session.ISession;
};

export const rootReducer = combineReducers<IAppState>({
  counter: counter.counterReducer,
  session: session.sessionReducer,
  router: routerReducer,
});

export function deimmutify(store) {
  return {
    counter: store.counter.toJS(),
    session: store.session.toJS(),
    router: store.router,
  };
}

export function reimmutify(plain) {
  return {
    counter: counter.CounterFactory(plain.counter),
    session: session.SessionFactory(plain.session),
    router: plain.router,
  };
}
