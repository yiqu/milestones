import { AuthEffects } from '../auth/auth.effects';
import { RouterEffects } from '../router-related/router-related.effects';
import { LocalStorageEffects } from '../local-storage/local-storage.effects';
import { SettingsEffects } from '../settings/settings.effects';

export const appEffects = [
  AuthEffects,
  RouterEffects,
  LocalStorageEffects,
  SettingsEffects
]
