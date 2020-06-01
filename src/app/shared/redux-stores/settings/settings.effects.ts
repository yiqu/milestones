import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap, switchMap, map, catchError, take, concatMap } from 'rxjs/operators';
import * as SettingsAction from './settings.actions';
import { AngularFireService } from '../../../services/fire-store.service';
import { ISettingsConfiguration } from '../../models/settings.models';
import { ToasterService } from '../../../services/toaster.service';
import { of } from 'rxjs';
import { FirebasePromiseError } from '../../models/firebase.model';
import * as utils from '../../utils/auth.utils';

const SETTINGS_BASE_PATH: string = "settings";

@Injectable()
export class SettingsEffects {

  constructor(public actions$: Actions, public afs: AngularFireService,
    private ts: ToasterService) {
  }

  getSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsAction.getSettingsStartAction),
      switchMap(
        (val) => {
          return this.afs.getDocByPath<any>(SETTINGS_BASE_PATH).pipe(
            take(1),
            map((res: ISettingsConfiguration) => {
              return SettingsAction.getSettingsDoneAction({settingsVal: res});
            }),
            catchError((err) => {
              return of(SettingsAction.getSettingsFailureAction({errorMsg: err}));
            })
          );
        }
      ));
  });

  getSettingsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsAction.getSettingsDoneAction),
      tap(() => {
        this.ts.getSuccess("Settings data loaded.");
      })
    );
  }, {dispatch: false});

  crudFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsAction.getSettingsFailureAction,
        SettingsAction.updateSettingsFailureAction),
      tap((state) => {
        this.ts.getError("Error: " + state.errorMsg);
      })
    );
  }, {dispatch: false});

  updateSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsAction.updateSettingsDoneAction),
      tap((state) => {
        this.ts.getSuccess("Successfully updated settings data.");
      })
    );
  }, {dispatch: false});

  updateSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsAction.updateSettingsStartAction),
      concatMap((payload) => {
        return this.afs.setDocByPath("settings", payload.settingsVal).then(
          (res) => {
            return SettingsAction.updateSettingsDoneAction();
          },
          (rej: FirebasePromiseError) => {
            const errMsg = utils.getFirebaseErrorMsg(rej);
            return SettingsAction.updateSettingsFailureAction({errorMsg: errMsg});
          }
        )
      })
    );
  });
}


