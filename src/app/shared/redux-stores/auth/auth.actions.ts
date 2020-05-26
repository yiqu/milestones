import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { AuthInfoFromUser, VerifiedUser } from '../../models/user.model';

const LOGIN_START: string = "[Auth/Login] Auth Login Start";
const LOGIN_SUCCESS: string = "[Auth/Login] Auth Login Success";
const LOGIN_FAILURE: string = "[Auth/Login] Auth Login Failure";
const NEW_USER_CREATION_START: string = "[Auth/Create] Auth New User Creation Start";
const NEW_USER_CREATION_SUCCESS: string = "[Auth/Create] Auth New User Creation Success";
const NEW_USER_CREATION_FAILURE: string = "[Auth/Create] Auth New User Creation Failure";

export const authLoginStart = createAction(
  LOGIN_START,
  props<{ authInfo: AuthInfoFromUser }>()
);

export const authLoginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ verifiedUser: VerifiedUser }>()
);

export const authLoginFailure = createAction(
  LOGIN_FAILURE,
  props<{ errorMsg: string }>()
);
