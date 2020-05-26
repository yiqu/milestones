import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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

  authErrMsg: string;
  authLoading: boolean;

  private usersBaseUrl: string = "users/";
  signupErrorOccured$: Subject<string> = new Subject<string>();

  constructor(private afs: AngularFirestore, public store: Store<AppState>) {

    firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        console.log("AUTH:", user ? user.toJSON():user)
        if (user) {
          const u = (<VerifiedUser>user.toJSON());
        } else {

        }
      },
      (err) => {
        //this.sbs.openSnackBar("Error authenticating user: " + err['code'] + err['message']);
      },
      () => {
      }
    );
  }


  createUser(authInfo: AuthInfoFromUser) {
    this.authErrMsg = null;
    let sess: string = authInfo.saveSession ?
      firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

    firebase.auth().setPersistence(sess)
    .then(() => {
      this.authLoading = true;
      return firebase.auth().createUserWithEmailAndPassword(authInfo.id, authInfo.password);
    })
    .then(
      (u: firebase.auth.UserCredential) => {
        const user: VerifiedUser = <VerifiedUser>u.user.toJSON();
        const userId: AngularFirestoreDocument = this.afs.doc(this.usersBaseUrl + user.uid);
        return userId.set(user)

      },
      (rej) => {
        //this.authErrMsg = this.getFirebaseErrorMsg(rej);
        return "ERROR";
      }
    )
    .finally(() => {
      this.authLoading = false;
    });
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

}
