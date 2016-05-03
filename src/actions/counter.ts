import { Injectable } from '@angular/core';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants';

@Injectable()
export class CounterActions {
  increment() {
    return {
      type: INCREMENT_COUNTER
    };
  }

  decrement() {
    return {
      type: DECREMENT_COUNTER
    };
  }
}
