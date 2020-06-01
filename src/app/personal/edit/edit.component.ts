import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import * as MSActions from '../../shared/redux-stores/milestone/milestone.actions';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { AuthState } from 'src/app/shared/redux-stores/auth/auth.models';
import { QueryExtras, IMilestonePersonalState } from 'src/app/shared/redux-stores/milestone/milestone.model';
import { VerifiedUser } from 'src/app/shared/models/user.model';
import { Subject, combineLatest, Observable } from 'rxjs';
import { IJobConfig } from 'src/app/shared/models/job-config.model';

@Component({
  selector: 'app-personal-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css', '../personal.component.css']
})
export class PersonalEditComponent implements OnInit {

  compDest$: Subject<any> = new Subject<any>();
  allMilestones: IJobConfig[] = [];

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.select("appAuth").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (data) => {
        this.getAllMilestones(data.verifiedUser);
      }
    );

    this.store.select("personal").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (data: IMilestonePersonalState) => {
        this.allMilestones = [];
        this.allMilestones = data.payloadData;
      }
    );

  }

  getAllMilestones(user: VerifiedUser) {
    const extra = new QueryExtras(user, null);
    this.store.dispatch(MSActions.getAllMilestonesAction({extras: extra}));
  }
}
