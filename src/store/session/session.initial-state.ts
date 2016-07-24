import { immutify } from '../record.factory';
import {
  ISessionRecord,
  ISession,
  IUser,
  IUserRecord,
} from './session.types';

export const INITIAL_USER_STATE = immutify<IUser, IUserRecord>({
  firstName: null,
  lastName: null
});

export const INITIAL_STATE = immutify<ISession, ISessionRecord>({
  token: null,
  user: INITIAL_USER_STATE,
  hasError: false,
  isLoading: false,
});
