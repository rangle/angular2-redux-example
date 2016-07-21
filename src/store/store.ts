import { combineReducers } from 'redux';
import * as counter from './counter';
import * as session from './session';
import { immutify } from './record.factory';

export interface IAppState {
  counter?: counter.ICounter;
  session?: session.ISession;
};

export const rootReducer = combineReducers<IAppState>({
  counter: counter.counterReducer,
  session: session.sessionReducer,
});

export function deimmutify(store) {
  return {
    counter: store.counter.toJS(),
    session: store.session.toJS(),
  };
}

export function reimmutify(plain) {
  return {
    counter: immutify(counter.INITIAL_STATE, plain.counter),
    session: immutify(session.INITIAL_STATE, plain.session),
  };
}
