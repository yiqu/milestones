import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore';
import { switchMap, catchError, map, tap, concatMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, from, of, Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AuthInfoFromUser, VerifiedUser, InAppAlias, User } from '../../models/user.model';
import * as AuthUtils from '../../utils/auth.utils';
import * as fromRouterActions from '../router-related/router-related.actions';
import * as fromMsActions from './milestone.actions';
import { ToasterService } from '../../../services/toaster.service';
import { IJobConfig } from '../../models/job-config.model';
import { FirebasePromiseError } from '../../models/firebase.model';
import { getPureObject } from '../../utils/general.utils';

@Injectable()
export class MilestonePersonalEffects {

  private milestonesBaseUrl: string = "/milestones/all";

  constructor(public as: AuthService, public actions$: Actions,
    public router: Router, public route: ActivatedRoute,
    private afs: AngularFirestore, private ts: ToasterService) {
  }

  addNewMilestone$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.addMilestoneStartAction),
      concatMap((msData) => {
        this.ts.getInfo("Adding new Milestone...");
        const config: IJobConfig = msData.payload;
        const dbRef = this.getDbCollection(config.user.uid).doc();
        const fbId: string = dbRef.id;
        const data: IJobConfig = JSON.parse(JSON.stringify(config));
        data.firebaseId = fbId;

        return dbRef.set(getPureObject(data))
        .then(
          (res) => {
            return fromMsActions.addMilestoneDoneAction({payload: data});
          },
          (rej: FirebasePromiseError) => {
            return fromMsActions.addMilestoneFailureAction({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
          }
        );
      })
    );
  });

  addNewMilestoneSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.addMilestoneDoneAction),
      tap(() => {
        this.ts.getSuccess("Milestone added successfully.");
        this.router.navigate(['/', 'personal', 'add-complete'])
      })
    );
  }, {dispatch: false});


  addNewMilestoneFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.addMilestoneFailureAction),
      tap((data) => {
        this.ts.getError(data.errorMsg);
      })
    );
  }, {dispatch: false});

  getNewMilestoneFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.getAllMilestonesFailureAction),
      tap((data) => {
        this.ts.getError(data.errorMsg);
      })
    );
  }, {dispatch: false});


  getAllMilestones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.getAllMilestonesAction),
      switchMap((data) => {
        const extras = data.extras;
        const user = extras.user;
        return this.getDbCollection(user.uid).orderBy("dateStarted.value", "desc").get().then(
          (res) => {
            const result: any[] = [];
            res.forEach((d) => {
              result.push({
                ...d.data(),
                firebaseId: d.id
              })
            });
            return fromMsActions.getAllMilestonesDoneAction({payload: result});
          },
          (rej: FirebasePromiseError) => {
            return fromMsActions.getAllMilestonesFailureAction({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
          }
        )
      })
    );
  });

  getNewMilestoneSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.getAllMilestonesDoneAction),
      tap(() => {
        this.ts.getSuccess("Loaded all Milestones.");
      })
    );
  }, {dispatch: false});

  // redirect to edit page
  startMilestoneEdit$ = createEffect(() => {
  return this.actions$.pipe(
      ofType(fromMsActions.editMilestoneStartAction),
      map((data) => {
        return fromMsActions.editMilestoneRedirectAction({payload: data.payload});
      })
    );
  });


  redirectMilestoneEdit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.editMilestoneRedirectAction),
      tap((data) => {
        if (data.payload.firebaseId) {
          this.router.navigate(['/', 'personal', 'edit', data.payload.firebaseId]);
        }
      })
    );
  }, {dispatch: false});


  saveMilestoneEdit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.editMilestoneSaveStartAction),
      switchMap((d) => {
        d.payload
        return this.getDbCollection(d.payload.user.uid)
          .doc(d.payload.firebaseId).update(getPureObject(d.payload))
          .then(
            (res) => {
              return fromMsActions.editMilestoneSaveDoneAction();
            },
            (rej: FirebasePromiseError) => {
              return fromMsActions.editMilestoneSaveFailureAction({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
            }
          )
      })
    );
  });


  saveMilestoneEditSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.editMilestoneSaveDoneAction),
      tap((data) => {
        this.ts.getSuccess("Updated Milestone successfully.");
        this.router.navigate(['/', 'personal', 'edit']);
      })
    );
  }, {dispatch: false});


  saveMilestoneEditFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.editMilestoneSaveFailureAction),
      tap((data) => {
        this.ts.getError(data.errorMsg);
      })
    );
  }, {dispatch: false});


  getDbCollection(uid: string) {
    // {{uid}}/milestones/all  <--path
    return firebase.firestore().collection(uid + this.milestonesBaseUrl);
  }

}
