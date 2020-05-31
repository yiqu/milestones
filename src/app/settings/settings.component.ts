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
import * as SettingsAction from '../shared/redux-stores/settings/settings.actions';


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
  workingDayLabel: string = "Total number of work days per year (DOES NOT INCLUDE HOLIDAYS)";

  dataLoading: boolean;
  updateLoading: boolean;
  currentSettingData: ISettingsConfiguration;
  error: boolean;
  errorMsg: string;

  get workingDaysFc(): FormControl {
    return <FormControl>this.configFg.get("workDays");
  }

  constructor(private store: Store<AppState>, public fb: FormBuilder,
    public afs: AngularFireService, public ts: ToasterService) {
      this.store.select("settings").pipe(
        takeUntil(this.compDest$)
      ).subscribe(
        (state) => {
          this.dataLoading = state.loading;
          this.updateLoading = state.updateLoading;
          this.currentSettingData = state.settingsConfig;
          this.error = state.error;
          this.errorMsg = state.errorMsg;

          if (this.currentSettingData) {
            this.buildConfigFg(this.currentSettingData);
          }
        }
      )
  }

  ngOnInit() {
    this.store.dispatch(SettingsAction.getSettingsStartAction());
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
    if (this.configFg.valid) {
      this.store.dispatch(SettingsAction.updateSettingsStartAction({settingsVal: formVal}));
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
    this.ts.clearAll();
  }
}
