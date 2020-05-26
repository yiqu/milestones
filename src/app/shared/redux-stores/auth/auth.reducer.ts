import { AuthState } from "./auth.models";
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

/**
 * Auth Initial State
 */
const inititalState: AuthState = {
  verifiedUser: null,
  loading: false,
  error: false,
  errorMsg: null
}

export const authReducer = createReducer(
  inititalState,
  on(AuthActions.authLoginStart, (state, {authInfo}) => {

    return {
      ...state,
      loading: true,
      verifiedUser: null,
      error: false,
      errorMsg: null
    }
  }),

  on(AuthActions.authLoginSuccess, (state, {verifiedUser}) => {
    const u = verifiedUser;

    return {
      ...state,
      loading: false,
      verifiedUser: u,
      error: false,
      errorMsg: null
    }
  }),
)
