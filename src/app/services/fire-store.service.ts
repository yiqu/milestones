import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, Action,
  DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, of, throwError } from 'rxjs';
import * as utils from '../shared/utils/general.utils';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/redux-stores/global-store/app.reducer';
import { VerifiedUser } from '../shared/models/user.model';
import { FirebasePromiseError } from '../shared/models/firebase.model';
import * as authutils from '../shared/utils/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  currentUser: VerifiedUser;

  constructor(public afs: AngularFirestore, public store: Store<AppState>) {
    this.store.select("appAuth").subscribe(
      (state) => {
        this.currentUser = state.verifiedUser;
      }
    )
  }

  getDocByPath<T>(path: string) {
    const pathWithUserId: string = this.currentUser.uid + "/" + path;
    const itemDoc = this.afs.doc<T>(pathWithUserId);
    return itemDoc.snapshotChanges().pipe(
      map((changes: Action<DocumentSnapshot<T>>) => {
        //console.log(changes.payload.data(), changes.payload.metadata,changes.payload.ref)
        return changes.payload.data();
      }),
      catchError((err: FirebasePromiseError) => {
        return throwError(authutils.getFirebaseErrorMsg(err));
      })
    );;
  }

  setDocByPath(path: string, payload: any) {
    const pathWithUserId: string = this.currentUser.uid + "/" + path;
    const itemDoc = this.afs.doc(pathWithUserId);
    return itemDoc.set(payload);
  }

  updateDocByPath(path: string, payload: any) {
    const pathWithUserId: string = this.currentUser.uid + "/" + path;
    const itemDoc = this.afs.doc(pathWithUserId);
    return itemDoc.update(payload);
  }

  deleteDocByPath(path: string) {
    const pathWithUserId: string = this.currentUser.uid + "/" + path;
    const itemDoc = this.afs.doc(pathWithUserId);
    return itemDoc.delete();
  }

}
