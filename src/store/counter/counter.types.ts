import { Map, Record } from 'immutable';

// Allows you to call '.counter' directly instead of having to
// call .get('counter'). Note that this is still a wrapper around
// immutable.Map; to mutate you still need to call .set('count');
export const CounterRecord = Record({
  counter: 0
});

// Provides strong typing for build-time checking and editor completion on top
// of the record type above.
export interface ICounter extends Map<string, any> {
  counter: number;
  set: (prop: string, val: any) => ICounter;
  merge: (other: any) => ICounter;
};
