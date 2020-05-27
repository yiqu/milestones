import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../auth/auth.reducer';
import * as fromRouterReducer from '../router-related/router-related.reducer';
import { AuthState } from '../auth/auth.models';
import { RouterRedirectState } from '../router-related/router-related.models';

/**
 * App Overall State
 */
export interface AppState {
  appAuth: AuthState;
  appRouterRedirects: RouterRedirectState;

}

export const appReducers: ActionReducerMap<AppState> = {
  appAuth: fromAuthReducer.authReducer,
  appRouterRedirects: fromRouterReducer.routerReducer
}
