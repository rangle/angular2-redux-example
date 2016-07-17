import { ISession, IUser, SessionRecord, UserRecord } from './session.types';

export function deimmutifySession(session: ISession): Object {
  return session.toJS();
}

export function reimmutifySession(plain: any): ISession {
  return new SessionRecord(
    Object.assign(
      {},
      plain,
      { user: UserRecord(plain.user) })) as ISession;
}
