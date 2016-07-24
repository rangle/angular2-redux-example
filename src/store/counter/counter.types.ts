import { TypedRecord } from '../record.factory';

export interface ICounter {
  counter: number;
};

export interface ICounterRecord extends TypedRecord<ICounterRecord>,
  ICounter {
};
