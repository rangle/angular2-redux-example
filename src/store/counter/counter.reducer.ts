import { Action } from 'redux';
import { Map } from 'immutable';
import { CounterActions } from '../../actions/counter.actions';
import { SessionActions } from '../../actions/session.actions';
import { INITIAL_STATE } from './counter.initial-state';
import { ICounter } from './counter.types';

export function counterReducer(
  state: ICounter = INITIAL_STATE,
  action: Action): ICounter {

  switch (action.type) {

  case CounterActions.INCREMENT_COUNTER:
    return state.update('counter', (value) => value + 1) as ICounter;

  case CounterActions.DECREMENT_COUNTER:
    return state.update('counter', (value) => value - 1) as ICounter;

  case SessionActions.LOGOUT_USER:
    return state.merge(INITIAL_STATE) as ICounter;

  default:
    return state;
  }
}
