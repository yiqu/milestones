import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { SettingsState } from 'src/app/shared/redux-stores/settings/settings.model';
import { takeUntil, debounceTime } from 'rxjs/operators';
import * as SettingActions from '../../shared/redux-stores/settings/settings.actions';
import * as fv from '../../shared/form-validators/general-form.validator';
import { CurrencyDisplayPipe } from 'src/app/shared/pipes/currency-display.pipe';

const DEFAULT_DAYS: number = 251;

@Component({
  selector: 'app-personal-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.css']
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
    this.store.select("settings").pipe(
      takeUntil(this.compDest$)
    )
    .subscribe(
      (state: SettingsState) => {
        if (state.settingsConfig) {
          this.workingDays = state.settingsConfig.workDays ? state.settingsConfig.workDays : DEFAULT_DAYS;
          this.createNewMilestoneFg();
          this.settingsLoading = state.loading;
        }
      }
    );
    this.store.dispatch(SettingActions.getSettingsStartAction());
  }

  createNewMilestoneFg() {
    this.msFg = this.fb.group({
      endYear: this.createValueFg(true),
      projectedPTOInDays: this.createValueFg(true, true),
      wageRateType: fu.createFormControl(null, false, [Validators.required]),
      wageRateValue: this.createValueFg(true, true),
      salary: fu.createFormControl(null, false),
      hourlyRate: fu.createFormControl(null, false),
      cashablePTOInHours: this.createValueFg(true, true),
      Four1kContribution: this.createValueFg(true, true),
      bonus: this.createValueFg(true, true)
    });

    this.msFg.valueChanges.pipe(
      takeUntil(this.compDest$),
      debounceTime(1000)
    )
    .subscribe(
      (val) => {
        console.log(this.msFg.controls)
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
      value: fu.createFormControl(null, false, vals),
      note: fu.createFormControl(null, false)
    });
  }

  calculateHourly(): number {
    const salary: number = this.msFg.get("wageRateValue.value").value;
    if (salary > 0) {
      const projectedPto = +(this.msFg.get("projectedPTOInDays.value").value);
      const workableHours = (this.workingDays - projectedPto) * 8;
      const hourly = salary / workableHours;
      console.log(projectedPto, workableHours, hourly)
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
      console.log(projectedPto, workableHours, salary)
      return this.cdp.transform(+(salary.toFixed(2)));
    }
    return NaN;
  }

  onSubmitMilestone() {
    console.log(this.msFg.value, this.msFg.status)
    if (this.msFg.status !== "VALID") {
      this.formErrorOccured = true;
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
