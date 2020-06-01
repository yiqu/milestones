import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { SettingsState } from '../../shared/redux-stores/settings/settings.model';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';
import * as SettingActions from '../../shared/redux-stores/settings/settings.actions';
import * as fv from '../../shared/form-validators/general-form.validator';
import { CurrencyDisplayPipe } from '../../shared/pipes/currency-display.pipe';
import { VerifiedUser } from '../../shared/models/user.model';
import { AuthState } from '../../shared/redux-stores/auth/auth.models';
import { IMilestonePersonalState } from '../../shared/redux-stores/milestone/milestone.model';
import { IJobConfigFormValue, IJobConfig, JobConfig, FormValue } from '../../shared/models/job-config.model';
import * as moment from 'moment';
import * as MSActions from '../../shared/redux-stores/milestone/milestone.actions';

const DEFAULT_DAYS: number = 251;

@Component({
  selector: 'app-personal-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.css', '../personal.component.css']
})
export class PersonalAddComponent implements OnInit, OnDestroy {

  msFg: FormGroup;
  compDest$: Subject<any> = new Subject<any>();
  listOfYears: string[] = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];
  rateTypeLabel: string;
  workingDays: number;
  settingsLoading: boolean = true;
  formErrorOccured: boolean;
  calculatedRateWage: number;
  calculateWageValid: boolean;
  currentUser: VerifiedUser;
  crudLoading: boolean;
  formDebouncing: boolean;

  get projectedPto(): FormControl {
    return <FormControl>this.msFg.get("projectedPTOInDays.value");
  }

  get wageRateValue(): FormControl {
    return <FormControl>this.msFg.get("wageRateValue.value");
  }

  get wageRateType(): FormControl {
    return <FormControl>this.msFg.get("wageRateType");
  }

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private store: Store<AppState>, private cdp: CurrencyDisplayPipe) {
  }

  ngOnInit() {

    const settingsState$: Observable<SettingsState> = this.store.select("settings");
    const authState$: Observable<AuthState> = this.store.select("appAuth");
    const personalState$: Observable<IMilestonePersonalState> = this.store.select("personal");

    combineLatest(personalState$, settingsState$, authState$).pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      ([personal, setting, auth]) => {
        if (personal)  {
          this.crudLoading = personal.crudLoading;
        }
        if (setting.settingsConfig) {
          this.workingDays = setting.settingsConfig.workDays ? setting.settingsConfig.workDays : DEFAULT_DAYS;
          this.createNewMilestoneFg();
          this.settingsLoading = setting.loading;
        }
        if (auth) {
          this.currentUser = auth.verifiedUser;
        }
      }
    )
    this.store.dispatch(SettingActions.getSettingsStartAction());
  }

  createNewMilestoneFg() {
    this.msFg = this.fb.group({
      dateStarted: this.createValueFg(true),
      projectedPTOInDays: this.createValueFg(true, true),
      wageRateType: fu.createFormControl(null, false, [Validators.required]),
      wageRateValue: this.createValueFg(true, true),
      cashablePTOInHours: this.createValueFg(true, true),
      Four1kContribution: this.createValueFg(true, true),
      bonus: this.createValueFg(true, true)
    });

    this.msFg.valueChanges.pipe(
      tap(() => this.formDebouncing = true),
      takeUntil(this.compDest$),
      debounceTime(400)
    )
    .subscribe(
      (val) => {
        this.formErrorOccured = false;
        if (this.projectedPto.valid && this.wageRateType.value && this.wageRateValue.valid) {
          this.calculateWageValid = true;
          if (this.wageRateType.value === "salary") {
            this.calculatedRateWage = this.calculateHourly();
          } else if (this.wageRateType.value === "hourly") {
            this.calculatedRateWage = this.calculateSalary();
          }
        } else {
          this.calculateWageValid = false;
        }
        this.formDebouncing = false;
      }
    )
  }

  createValueFg(req: boolean, numberOnly: boolean = false): FormGroup {
    let vals = [];
    if (req) {
      vals.push(Validators.required);
    }
    if (numberOnly) {
      vals.push(fv.customOnlyNumbersValidator);
    }
    return this.fb.group({
      value: fu.createFormControl2((numberOnly ? 0 : null), false, vals),
      note: fu.createFormControl(null, false)
    });
  }

  calculateHourly(): number {
    const salary: number = this.msFg.get("wageRateValue.value").value;
    if (salary > 0) {
      const projectedPto = +(this.msFg.get("projectedPTOInDays.value").value);
      const workableHours = (this.workingDays - projectedPto) * 8;
      const hourly = salary / workableHours;
      return this.cdp.transform(+(hourly.toFixed(2)));
    }
    return NaN;
  }

  calculateSalary(): number {
    const hourly: number = this.msFg.get("wageRateValue.value").value;
    if (hourly > 0) {
      const projectedPto = +(this.msFg.get("projectedPTOInDays.value").value);
      const workableHours = (this.workingDays - projectedPto) * 8;
      const salary = hourly * workableHours;
      return this.cdp.transform(+(salary.toFixed(2)));
    }
    return NaN;
  }

  onSubmitMilestone() {
    if (this.msFg.status !== "VALID") {
      this.formErrorOccured = true;
    } else {
      const val: IJobConfigFormValue = this.msFg.value;
      let endYear: number = moment(val.dateStarted.value).year();
      const data: JobConfig = new JobConfig(
        endYear,
        val.projectedPTOInDays,
        new FormValue(undefined, undefined),
        new FormValue(undefined, undefined),
        val.cashablePTOInHours,
        val.Four1kContribution,
        val.bonus, val.dateStarted,
        this.currentUser
      );

      if (val.wageRateType === "salary") {
        data.salary = val.wageRateValue;
        data.hourlyRate.value = this.calculatedRateWage;
        data.hourlyRate.note = val.wageRateValue.note;
      } else if (val.wageRateType === "hourly") {
        data.hourlyRate = val.wageRateValue;
        data.salary.value = this.calculatedRateWage;
        data.salary.note = val.wageRateValue.note;
      }

      this.store.dispatch(MSActions.addMilestoneStartAction({payload: data}));
    }
  }

  resetMilestone() {
    this.msFg.reset();
  }

  onClearByFcName(fcName: string) {
    this.msFg.get(fcName).get('value').reset();
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
