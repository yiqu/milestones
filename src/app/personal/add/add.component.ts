import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
import { IMilestonePersonalState, QueryExtras } from '../../shared/redux-stores/milestone/milestone.model';
import { IJobConfigFormValue, IJobConfig, JobConfig, FormValue } from '../../shared/models/job-config.model';
import * as moment from 'moment';
import * as MSActions from '../../shared/redux-stores/milestone/milestone.actions';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-personal-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.css', '../personal.component.css']
})
export class PersonalAddComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  previousMilestone: IJobConfig;
  currentUser: VerifiedUser;
  milestoneToFill: IJobConfig;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private store: Store<AppState>, private cdp: CurrencyDisplayPipe, private ts: ToasterService) {
      this.store.select("personal").pipe(
        takeUntil(this.compDest$)
      ).subscribe(
        (state: IMilestonePersonalState) => {
          this.previousMilestone = state.previousEntry;
        }
      )

      this.store.select("appAuth").pipe(
        takeUntil(this.compDest$)
      ).subscribe(
        (data) => {
          this.currentUser = data.verifiedUser;
          if (this.currentUser) {
            const extra = new QueryExtras(this.currentUser, null);
            this.store.dispatch(MSActions.getPreviousMilestoneEntryStartAction({extras: extra}));
          }
        }
      );
  }

  ngOnInit() {
  }

  onSave(c: IJobConfig) {
    this.store.dispatch(MSActions.addMilestoneStartAction({payload: c}));
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  loadPrevious() {
    this.milestoneToFill = JSON.parse(JSON.stringify(this.previousMilestone));
    this.ts.getSuccessAndClear("Previous Milestone loaded successfully.");
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
