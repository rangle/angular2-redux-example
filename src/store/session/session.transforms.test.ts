import { Iterable } from 'immutable';
import { ISession, IUser, SessionRecord, UserRecord } from './session.types';
import { deimmutifySession, reimmutifySession } from './session.transforms';
import { INITIAL_STATE } from './session.initial-state';

describe('session.transforms', () => {
  const PLAIN_VERSION = {
    token: '123',
    user: {
      firstName: 'John',
      lastName: 'Doe'
    },
    hasError: true,
    isLoading: true,
  };

  describe('deimmutifySession', () => {
    it('should return a plain object', () => {
      const result = deimmutifySession(
        <ISession>SessionRecord({
          token: '123',
          user: UserRecord({
            firstName: 'John',
            lastName: 'Doe'
          }),
          hasError: true,
          isLoading: true,
        }));

      expect(Iterable.isIterable(result)).toBe(false);
      expect(result).toEqual(PLAIN_VERSION);
    });
  });

  describe('reimmutifySession', () => {
    it('should return a deeply immutable version', () => {
      const result = reimmutifySession(PLAIN_VERSION);
      expect(Iterable.isIterable(result)).toBe(true);
      expect(Iterable.isIterable(result.user)).toBe(true);
    });

    it('should return something with copy-on-write semantics', () => {
      const result = reimmutifySession(PLAIN_VERSION);
      const modifiedResult = result.set('token', 'abc');
      const modifiedUser = result.user.set('firstName', 'Alice');

      expect(result.token).toBe(PLAIN_VERSION.token);
      expect(modifiedResult.token).toBe('abc');

      expect(result.user.firstName).toBe('John');
      expect(modifiedUser.firstName).toBe('Alice');
    });
  });
});
