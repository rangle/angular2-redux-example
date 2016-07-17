import { Iterable } from 'immutable';
import fireAction from '../../utils/fire-action';
import { counterReducer } from './counter.reducer';
import { CounterActions } from '../../actions/counter.actions';

let state = counterReducer(undefined, { type: 'TEST_INIT '});

describe('counter reducer', () => {
  describe('inital state', () => {
    it('should be immutable', () => {
      expect(Iterable.isIterable(state)).toBe(true);
    });
  });

  describe('on INCREMENT_COUNTER', () => {
    it('should increment state.count', () => {
      const previousValue = state.counter;
      state = fireAction(
        counterReducer,
        state,
        CounterActions.INCREMENT_COUNTER);
      expect(state.counter).toEqual(1);
    });
  });

  describe('on DECREMENT_COUNTER', () => {
    it('should decrement state.count', () => {
      const previousValue = state.counter;
      state = fireAction(
        counterReducer,
        state,
        CounterActions.DECREMENT_COUNTER);
      expect(state.counter).toEqual(previousValue - 1);
    });
  });
});
