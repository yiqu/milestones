import { RouterRedirectState } from "./router-related.models";
import { on, createReducer } from '@ngrx/store';
import * as RouterActions from './router-related.actions';


/**
 * Auth Initial State
 */
const inititalState: RouterRedirectState = {
  toUrl: null
}


export const routerReducer = createReducer(
  inititalState,
  on(RouterActions.redirectWithUrl, (state, {url}) => {
    return {
      ...state,
      toUrl: url
    }
  }),
)
