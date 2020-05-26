import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../auth/auth.reducer';
import { AuthState } from '../auth/auth.models';

/**
 * App Overall State
 */
export interface AppState {
  appAuth: AuthState;

}

export const appReducers: ActionReducerMap<AppState> = {
  appAuth: fromAuthReducer.authReducer
}
