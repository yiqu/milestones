import { createAction, props } from '@ngrx/store';
import { RedirectUrlProp } from './router-related.models';

const REDIRECT_WITH_URL: string = "[Redirect/Router] Redirect With Router";

export const redirectWithUrl = createAction(
  REDIRECT_WITH_URL,
  props<RedirectUrlProp>()
);
