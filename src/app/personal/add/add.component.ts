import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';

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

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.queryParamMap.subscribe(
      (res: ParamMap) => {
        console.log("on add ms")
        this.createNewMilestoneFg();
      }
    )
  }

  ngOnInit() {

  }

  createNewMilestoneFg() {
    this.msFg = this.fb.group({
      endYear: this.createValueFg(true),
      projectedPTOInDays: this.createValueFg(true),
      wageRateType: fu.createFormControl(null, false, [Validators.required]),
      wageRateValue: this.createValueFg(true),
      salary: fu.createFormControl(null, false),
      hourlyRate: fu.createFormControl(null, false),
      cashablePTOInHours: this.createValueFg(true),
      Four1kContribution: this.createValueFg(true),
      bonus: this.createValueFg(true)
    });

    this.msFg.valueChanges.subscribe(
      (val) => {
        console.log(this.msFg.controls)
      }
    )
  }

  createValueFg(req: boolean): FormGroup {
    return this.fb.group({
      value: fu.createFormControl(null, false, (req ?  [Validators.required]: null)),
      note: fu.createFormControl(null, false)
    });
  }

  onSubmitMilestone() {
    console.log(this.msFg.value, this.msFg.status)
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
