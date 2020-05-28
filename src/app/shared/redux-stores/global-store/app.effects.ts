import { AuthEffects } from '../auth/auth.effects';
import { RouterEffects } from '../router-related/router-related.effects';
import { LocalStorageEffects } from '../local-storage/local-storage.effects';

export const appEffects = [
  AuthEffects,
  RouterEffects,
  LocalStorageEffects
]
