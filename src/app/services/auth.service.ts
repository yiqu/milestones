import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { VerifiedUser, AuthInfo } from '../shared/models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authErrMsg: string;
  authLoading: boolean;

  private usersBaseUrl: string = "users/";
  signupErrorOccured$: Subject<string> = new Subject<string>();

  ordersInCartFList: AngularFireList<any>;

  constructor(public firedb: AngularFireDatabase) {
    //this.ordersInCartFList = this.firedb.list<any>(this.usersBaseUrl);

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

    // this.ordersInCartFList.valueChanges().subscribe((val) => {
    //   console.log(val)
    // })
  }


  createUser(authInfo: AuthInfo) {
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
        const userIdRef = firebase.database().ref(this.usersBaseUrl + user.uid);
        return userIdRef.set(user);
      },
      (rej) => {
        this.authErrMsg = this.getFirebaseErrorMsg(rej);
        return "ERROR";
      }
    )
    .finally(() => {
      this.authLoading = false;
    });
  }


  loginUser(authInfo: AuthInfo) {
    this.authErrMsg = null;
    let sess: string = authInfo.saveSession ?
      firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

    firebase.auth().setPersistence(sess)
    .then(() => {
      this.authLoading = true;
      return firebase.auth().signInWithEmailAndPassword(authInfo.id, authInfo.password);
    })
    .then(
      (u: firebase.auth.UserCredential) => {

      },
      (rej) => {
        this.authErrMsg = this.getFirebaseErrorMsg(rej);
      }
    ).finally(() => {
      this.authLoading = false;
    });
  }

  signoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getFirebaseErrorMsg(err: any): string {
    if (err) {
      return this.decodeFireBaseErr(err);
    }
    return "Server error occured, but could not get a detailed message from backend."
  }

  decodeFireBaseErr(err: any): string {
    let errMsg: string = "Server error occured."
    switch (err.code) {
      case "auth/email-already-in-use": {
        errMsg = "Email already exists.";
        this.signupErrorOccured$.next('email-already-in-use');
        break;
      }
      case "auth/invalid-email": {
        errMsg = "Email is invalid.";
        this.signupErrorOccured$.next('invalid-email');
        break;
      }
      case "auth/operation-not-allowed": {
        errMsg = "This operation is currently not allowed.";
        break;
      }
      case "auth/weak-password": {
        errMsg = "Password is too weak, try 6+ characters.";
        this.signupErrorOccured$.next('weak-password');
        break;
      }
      case "auth/user-not-found": {
        errMsg = "User does not exist.";
        break;
      }
      case "auth/wrong-password": {
        errMsg = "Invalid password.";
        break;
      }
      case "": {
        errMsg = "BLAH.";
        break;
      }
    }
    return errMsg + " " + err['message'];
  }

}
