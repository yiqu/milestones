import { AuthEffects } from '../auth/auth.effects';
import { RouterEffects } from '../router-related/router-related.effects';

export const appEffects = [
  AuthEffects,
  RouterEffects
]
