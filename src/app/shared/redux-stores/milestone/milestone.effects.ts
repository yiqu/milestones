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
import { QueryExtras } from './milestone.model';
import * as fromGeneralUtils from '../../utils/general.utils';

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
      }),
      map((d) => {
        return fromMsActions.getGainDifferenceAction({milestones: d.payload});
      })
    );
  });

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


  deleteMilestone$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.deleteMilestoneStartAction),
      switchMap((data) => {
        return this.getDbCollection(data.user.uid).doc(data.docId).delete()
        .then(
          (res) => {
            return fromMsActions.deleteMilestoneDoneAction(data);
          },
          (rej: FirebasePromiseError) => {
            return fromMsActions.deleteMilestoneFailureAction({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
          }
        )
      })
    );
  });

  deleteMilestoneFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.deleteMilestoneFailureAction),
      tap((data) => {
        this.ts.getError(data.errorMsg);
      })
    );
  }, {dispatch: false});


  deleteMilestoneSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.deleteMilestoneDoneAction),
      map((data) => {
        this.ts.getSuccess("Successfully deleted your Milestone.");
        const extras = new QueryExtras(data.user, null);
        return fromMsActions.getAllMilestonesAction({extras: extras});
      })
    );
  });

  getPreviousMilestoneEntry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.getPreviousMilestoneEntryStartAction),
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
            let previousEntry = null;
            if (result.length > 0) {
              previousEntry = result[0];
            }
            return fromMsActions.getPreviousMilestoneEntryDoneAction({previous: previousEntry});
          },
          (rej: FirebasePromiseError) => {
            return fromMsActions.getPreviousMilestoneEntryFailureAction({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
          }
        )
      })
    );
  });

  calculateGainDifference$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromMsActions.getGainDifferenceAction),
      map((ms) => {
        let data: IJobConfig[] = [...ms.milestones];
        const res: IJobConfig[] = [];
        for (let i=0; i<data.length; i++) {
          let d: IJobConfig = JSON.parse(JSON.stringify(data[i]));

          d.differenceInPercent = (fromGeneralUtils.caluclateTotalComp(data[i]) -
            fromGeneralUtils.caluclateTotalComp(data[i+1])) / fromGeneralUtils.caluclateTotalComp(data[i+1]);
          res.push(d);
        }
        return fromMsActions.getGainDifferenceActionDone({milestones: res});
      })
    );
  });


  getDbCollection(uid: string) {
    // {{uid}}/milestones/all  <--path
    return firebase.firestore().collection(uid + this.milestonesBaseUrl);
  }

}
