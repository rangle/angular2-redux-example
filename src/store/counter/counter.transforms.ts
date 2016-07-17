import { ICounter, CounterRecord } from './counter.types';

export function deimmutifyCounter(counter: ICounter): Object {
  return counter.toJS();
}

export function reimmutifyCounter(plain: Object): ICounter {
  return new CounterRecord(plain) as ICounter;
}
