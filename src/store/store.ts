import { combineReducers } from 'redux';
import * as counter from './counter';
import * as session from './session';

export interface IAppState {
  counter?: counter.ICounter;
  session?: session.ISession;
};

export const rootReducer = combineReducers<IAppState>({
  counter: counter.counterReducer,
  session: session.sessionReducer
});

export function deimmutify(store) {
  return {
    counter: counter.deimmutifyCounter(store.counter),
    session: session.deimmutifySession(store.session),
  };
}

export function reimmutify(plain) {
  return {
    counter: counter.reimmutifyCounter(plain.counter),
    session: session.reimmutifySession(plain.session),
  };
}
