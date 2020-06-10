import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../../shared/utils/form.utils';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/redux-stores/global-store/app.reducer';
import { SettingsState } from '../../../shared/redux-stores/settings/settings.model';
import { takeUntil, debounceTime, tap } from 'rxjs/operators';
import * as SettingActions from '../../../shared/redux-stores/settings/settings.actions';
import * as fv from '../../../shared/form-validators/general-form.validator';
import { CurrencyDisplayPipe } from '../../../shared/pipes/currency-display.pipe';
import { VerifiedUser } from '../../../shared/models/user.model';
import { IJobConfigFormValue, IJobConfig, JobConfig, FormValue, IFormValue } from '../../../shared/models/job-config.model';
import * as moment from 'moment';
import { IMilestonePersonalState } from '../../redux-stores/milestone/milestone.model';
import { AuthState } from '../../redux-stores/auth/auth.models';

const DEFAULT_DAYS: number = 251;

@Component({
  selector: 'app-milestone-new-add',
  templateUrl: 'new.component.html',
  styleUrls: ['./new.component.css']
})
export class MilestoneAddComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  editingConfig: IJobConfig;

  @Output()
  onConfigSave: EventEmitter<JobConfig> = new EventEmitter<JobConfig>();

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

  ngOnChanges() {
    if (this.editingConfig) {
      this.createNewMilestoneFg(this.editingConfig);
    } else {
      this.createNewMilestoneFg();
    }

  }

  ngOnInit() {
    const settingsState$: Observable<SettingsState> = this.store.select("settings");
    const authState$: Observable<AuthState> = this.store.select("appAuth");

    combineLatest(settingsState$, authState$).pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      ([setting, auth]) => {
        this.settingsLoading = setting.loading;
        this.workingDays = setting.settingsConfig?.workDays ? setting.settingsConfig.workDays : DEFAULT_DAYS;
        if (auth) {
          this.currentUser = auth.verifiedUser;
        }
      }
    )
    this.store.dispatch(SettingActions.getSettingsStartAction());
  }

  createNewMilestoneFg(config?: IJobConfig) {
    const cn = config?.companyName;
    const ds = new FormValue(moment(config?.dateStarted.value).format("MM/DD/YYYY"), config?.dateStarted.note);
    const ppto = config?.projectedPTOInDays;
    const wrt = config ? "salary" : null;
    const wrv = config?.salary;
    const cpto = config?.cashablePTOInHours;
    const fc = config?.Four1kContribution;
    const b = config?.bonus;

    this.msFg = this.fb.group({
      companyName: fu.createFormControl(cn, false, [Validators.required]),
      dateStarted: this.createValueFg(true, false, ds),
      projectedPTOInDays: this.createValueFg(true, true, ppto),
      wageRateType: fu.createFormControl(wrt, false, [Validators.required]),
      wageRateValue: this.createValueFg(true, true, wrv),
      cashablePTOInHours: this.createValueFg(true, true, cpto),
      Four1kContribution: this.createValueFg(true, true, fc),
      bonus: this.createValueFg(true, true, b)
    });

    this.msFg.valueChanges.pipe(
      tap(() => this.formDebouncing = true),
      takeUntil(this.compDest$),
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

  createValueFg(req: boolean, numberOnly: boolean = false, formVal?: IFormValue): FormGroup {
    let vals = [];
    if (req) {
      vals.push(Validators.required);
    }
    if (numberOnly) {
      vals.push(fv.customOnlyNumbersValidator);
    }
    let val = null;
    let note = null;
    if (formVal) {
      val = formVal?.value;
      note = formVal?.note;
    }
    return this.fb.group({
      value: fu.createFormControl2(val, false, vals),
      note: fu.createFormControl(note, false)
    });
  }

  calculateHourly(): number {
    const salary: number = this.msFg.get("wageRateValue.value").value;
    if (salary > 0) {
      const projectedPto = +(this.msFg.get("projectedPTOInDays.value").value);
      const workableHours = (this.workingDays - projectedPto) * 8;
      const hourly = salary / workableHours;
      return (+(hourly.toFixed(2)));
    }
    return NaN;
  }

  calculateSalary(): number {
    const hourly: number = this.msFg.get("wageRateValue.value").value;
    if (hourly > 0) {
      const projectedPto = +(this.msFg.get("projectedPTOInDays.value").value);
      const workableHours = (this.workingDays - projectedPto) * 8;
      const salary = hourly * workableHours;
      return (+(salary.toFixed(2)));
    }
    return NaN;
  }

  onSubmitMilestone() {
    if (this.msFg.status !== "VALID") {
      this.formErrorOccured = true;
    } else {
      const val: IJobConfigFormValue = this.msFg.value;
      let endYear: number = moment(new Date(val.dateStarted.value)).year();
      let dateStartedInMilli: number = new Date(val.dateStarted.value).getTime();
      val.dateStarted.value = dateStartedInMilli;
      const data: JobConfig = new JobConfig(
        val.companyName,
        endYear,
        val.projectedPTOInDays,
        new FormValue(undefined, undefined),
        new FormValue(undefined, undefined),
        val.cashablePTOInHours,
        val.Four1kContribution,
        val.bonus,
        val.dateStarted,
        this.currentUser,
        this.editingConfig?.firebaseId
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

      if (this.currentUser) {
        this.onConfigSave.emit(data);
      } else {
        console.error("NO user");
      }
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
