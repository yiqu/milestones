import { createAction, props } from '@ngrx/store';
import { VerifiedUser } from '../../models/user.model';

const SAVE_VERIFIED_USER: string = "[LocalStorage/Auth] Save Verified User";
const CLEAR_VERIFIED_USER: string = "[LocalStorage/Auth] Clear Verified User";

export const saveVerifiedUserAction = createAction(
  SAVE_VERIFIED_USER,
  props<{user: VerifiedUser}>()
)


export const clearVerifiedUserAction = createAction(
  CLEAR_VERIFIED_USER
)
