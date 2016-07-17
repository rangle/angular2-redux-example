import { Iterable } from 'immutable';
import { ICounter, CounterRecord } from './counter.types';
import { deimmutifyCounter, reimmutifyCounter } from './counter.transforms';

describe('counter.transforms', () => {
  describe('deimmutifyCounter', () => {
    it('should return a plain object', () => {
      const result = deimmutifyCounter(<ICounter>CounterRecord({ counter: 5 }));
      expect(Iterable.isIterable(result)).toBe(false);
      expect(result).toEqual({ counter: 5 });
    });
  });

  describe('reimmutifyCounter', () => {
    it('should return an immutable version', () => {
      const result = reimmutifyCounter({ counter: 0 });
      expect(Iterable.isIterable(result)).toBe(true);
    });

    it('should return something with a read-only count property', () => {
      const result = reimmutifyCounter({ counter: 10 });
      expect(result.counter).toBe(10);

      expect(() => result.counter = 11)
        .toThrowError('Cannot set on an immutable record.');
    });

    it('should return something with copy-on-write semantics', () => {
      const result = reimmutifyCounter({ counter: 10 });
      const modifiedResult = result.set('counter', 11);

      expect(result.counter).toBe(10);
      expect(modifiedResult.counter).toBe(11);
    });
  });
});
