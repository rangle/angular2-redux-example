import { immutify } from '../record.factory';
import {
  ICounterRecord,
  ICounter,
} from './counter.types';

export const INITIAL_STATE = immutify<ICounter, ICounterRecord>({
  counter: 0,
});
