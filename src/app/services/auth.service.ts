import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { AngularFirestore, AngularFirestoreDocument,
  AngularFirestoreCollection } from '@angular/fire/firestore';
import { VerifiedUser, AuthInfoFromUser } from '../shared/models/user.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/redux-stores/global-store/app.reducer';
import * as AuthActions from '../shared/redux-stores/auth/auth.actions';
import { UserRegistrationFromEmailActionProp } from '../shared/redux-stores/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFirestore, public store: Store<AppState>) {
    // this determines if firebase auth has emitted the first result,
    // if it has not, don't redirect, or resume redirect operations
    let firstAuthUserFetchCallCompleted: boolean = false;

    firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        console.log("AUTH:", user ? user.toJSON():user);
        if (user) {
          const u = (<VerifiedUser>user.toJSON());
          this.setVerifiedUser(u, firstAuthUserFetchCallCompleted);
          firstAuthUserFetchCallCompleted = true;
        } else {
          this.unsetVerifiedUser();
          firstAuthUserFetchCallCompleted = true;
        }
      },
      (err) => {
        console.error("Error occured in firebase auth state change trigger.")
      },
      () => {
        console.info("Firebase auth state change completed.")
      }
    );
  }

  registerUser(authInfo: AuthInfoFromUser) {
    const p = new UserRegistrationFromEmailActionProp(authInfo.id, authInfo.password, authInfo.saveSession);
    this.store.dispatch(AuthActions.authUserRegistrationFromEmailStart(p));
  }

  userLogin(authInfo: AuthInfoFromUser) {
    this.store.dispatch(AuthActions.authLoginStart({authInfo: authInfo}));
  }

  signoutUser() {
    this.store.dispatch(AuthActions.authLogoutStart());
  }

  clearErrors() {
    this.store.dispatch(AuthActions.authClearErrorsByUser());
  }

  throwErrorMessage(msg: string) {
    this.store.dispatch(AuthActions.authThrowErrorMessageByUser({errorMsg: msg}));
  }

  setVerifiedUser(u: VerifiedUser, redirect: boolean) {
    this.store.dispatch(AuthActions.authLoginSuccess({verifiedUser: u, redirect: redirect}));
  }

  unsetVerifiedUser() {
    this.store.dispatch(AuthActions.authLogoutSuccess({redirect: false}));
  }

}
