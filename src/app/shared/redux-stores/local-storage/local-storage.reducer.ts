import { createReducer, on } from '@ngrx/store';
import { LocalStorageState } from './local-storage.models';
import * as LSActions from './local-storage.actions';

/**
 * LS Initial State
 */
const inititalState: LocalStorageState = {
  savedVerifiedUser: null,
}


export const localStorageReducer = createReducer(
  inititalState,
  on(LSActions.saveVerifiedUserAction, (state, {user}) => {
    return {
      ...state,
      savedVerifiedUser: user
    }
  }),
  on(LSActions.clearVerifiedUserAction, (state) => {
    return {
      ...state,
      savedVerifiedUser: null
    }
  }),
)
