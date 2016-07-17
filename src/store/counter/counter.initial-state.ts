import { reimmutifyCounter } from './counter.transforms';

export const INITIAL_STATE = reimmutifyCounter({
  counter: 0,
});
