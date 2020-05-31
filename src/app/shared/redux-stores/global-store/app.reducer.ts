import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../auth/auth.reducer';
import * as fromRouterReducer from '../router-related/router-related.reducer';
import * as fromLsReducer from '../local-storage/local-storage.reducer';
import { AuthState } from '../auth/auth.models';
import { RouterRedirectState } from '../router-related/router-related.models';
import { LocalStorageState } from '../local-storage/local-storage.models';
import { SettingsState } from '../settings/settings.model';
import * as fromSettingsReducer from '../settings/settings.reducer';

/**
 * App Overall State
 */
export interface AppState {
  appAuth: AuthState;
  appRouterRedirects: RouterRedirectState;
  localStorage: LocalStorageState;
  settings: SettingsState

}

export const appReducers: ActionReducerMap<AppState> = {
  appAuth: fromAuthReducer.authReducer,
  appRouterRedirects: fromRouterReducer.routerReducer,
  localStorage: fromLsReducer.localStorageReducer,
  settings: fromSettingsReducer.settingsReducer
}
