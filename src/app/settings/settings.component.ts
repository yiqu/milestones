import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/redux-stores/global-store/app.reducer';
import { VerifiedUser } from '../shared/models/user.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireService } from '../services/fire-store.service';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { AuthState } from '../shared/redux-stores/auth/auth.models';
import { ISettingsConfiguration } from '../shared/models/settings.models';
import * as fu from '../shared/utils/form.utils';
import * as fv from '../shared/form-validators/general-form.validator';
import { Subject } from 'rxjs';
import { ToasterService } from '../services/toaster.service';


@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  user: VerifiedUser;
  configFg: FormGroup;
  formValid: boolean = true;
  compDest$: Subject<any> = new Subject<any>();

  constructor(private store: Store<AppState>, public fb: FormBuilder,
    public afs: AngularFireService, public ts: ToasterService) {

  }

  get workingDaysFc(): FormControl {
    return <FormControl>this.configFg.get("workDays");
  }

  ngOnInit() {
    this.store.select("appAuth").pipe(
      takeUntil(
        this.compDest$
      ),
      tap((state: AuthState) => {
        this.user = state.verifiedUser;
      }),
      switchMap((state) => {
        return this.getUserConfigData();
      }),
    )
    .subscribe(
      (res: ISettingsConfiguration) => {
        this.buildConfigFg(res);
        this.ts.getSuccess("Config loaded.");
      },
      (err) => {
        this.ts.getError(err['code']);
      }
    )
  }

  getUserConfigData() {
    const userConfigData$ = this.afs.getDocByPath("settings");
    return userConfigData$;
  }

  buildConfigFg(data: ISettingsConfiguration) {
    this.configFg = this.fb.group({
      workDays: fu.createFormControl(data?.workDays, false,
        [Validators.required, fv.customOnlyNumbersValidator]),
    });
  }

  updateConfig() {
    this.formValid = this.configFg.valid;
    const formVal = this.configFg.value;
    console.log(formVal)
    if (this.configFg.valid) {
      this.afs.setDocByPath("settings", formVal).then(
        (res) => {
          this.ts.getSuccess("Saved.");
        },
        (err) => {
          this.ts.getError("Something went wrong saving your value.");
        }
      )
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
    this.ts.clearAll();
  }
}
