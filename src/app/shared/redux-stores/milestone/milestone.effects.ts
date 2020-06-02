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
        return this.getDbCollection(config.user.uid).add(getPureObject(msData.payload)).then(
          (res) => {
            return fromMsActions.addMilestoneDoneAction();
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
      ofType(fromMsActions.addMilestoneFailureAction,
        fromMsActions.getAllMilestonesFailureAction),
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
            return fromMsActions.addMilestoneFailureAction({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
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



  getDbCollection(uid: string) {
    // {{uid}}/milestones/all  <--path
    console.log(uid + this.milestonesBaseUrl)
    return firebase.firestore().collection(uid + this.milestonesBaseUrl);
  }

}
