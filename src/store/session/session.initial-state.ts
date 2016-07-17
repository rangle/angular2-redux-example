import { reimmutifySession } from './session.transforms';

export const INITIAL_STATE = reimmutifySession({
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
});
