import { Record, Map } from 'immutable';

export const UserRecord = Record({
  firstName: '',
  lastName: '',
});

export interface IUser extends Map<string, any> {
  firstName: string;
  lastName: string;
  set: (prop: string, val: any) => IUser;
};

// Allows you to call '.token', etc., directly instead of having to
// call .get('count'). Note that this is still a wrapper around
// immutable.Map; to mutate you still need to call .set('count');
export const SessionRecord = Record({
  token: '',
  user: UserRecord(),
  hasError: false,
  isLoading: false,
});

// Provides strong typing for build-time checking and editor completion on top
// of the record type above.
export interface ISession extends Map<string, any> {
  token: string;
  user: IUser;
  hasError: boolean;
  isLoading: boolean;

  set: (prop: string, val: any) => ISession;
  merge: (other: any) => ISession;
};
