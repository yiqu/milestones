import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as LSActions from './local-storage.actions';
import { tap } from 'rxjs/operators';
import { VerifiedUser } from '../../models/user.model';

const LOCAL_STORAGE_USER_KEY: string = "VERIFIED_USER";

@Injectable()
export class LocalStorageEffects {

  constructor(public actions$: Actions) {
  }

  saveUserToLs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LSActions.saveVerifiedUserAction),
      tap((u) => {
        saveCurrentUser(u.user);
      }));
  }, {dispatch: false});

  clearUserFromLs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LSActions.clearVerifiedUserAction),
      tap((u) => {
        clearCurrentUser();
      }));
  }, {dispatch: false});

}

export function saveCurrentUser(u: VerifiedUser) {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(u));
}

export function clearCurrentUser() {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}
