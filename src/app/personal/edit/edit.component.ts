import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import * as MSActions from '../../shared/redux-stores/milestone/milestone.actions';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { QueryExtras, IMilestonePersonalState } from '../../shared/redux-stores/milestone/milestone.model';
import { VerifiedUser } from '../../shared/models/user.model';
import { Subject, combineLatest, Observable } from 'rxjs';
import { IJobConfig } from '../../shared/models/job-config.model';
import { ToasterService } from '../../services/toaster.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.css', '../personal.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class PersonalEditComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  allMilestones: IJobConfig[] = [];
  loading: boolean = true;
  pageTitle: string;
  currentUser: VerifiedUser;

  constructor(private store: Store<AppState>, private ts: ToasterService,
    public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.select("appAuth").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (data) => {
        this.getAllMilestones(data.verifiedUser);
        this.currentUser = data.verifiedUser;
      }
    );

    this.store.select("personal").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (data: IMilestonePersonalState) => {
        this.allMilestones = [];
        this.allMilestones = data.payloadData;
        this.loading = data.loading;
        this.pageTitle = this.allMilestones.length > 0 ?
          ("My Milestones (" + this.allMilestones.length + ")") : "";
      }
    );

  }

  onEdit(i: number) {
    const toEdit = this.allMilestones[i];
    this.store.dispatch(MSActions.editMilestoneStartAction({payload: toEdit}));
  }

  onDelete(i: number) {
    const toDelete: IJobConfig = this.allMilestones[i];
    this.store.dispatch(MSActions.deleteMilestoneStartAction(
      {docId: toDelete.firebaseId, user: this.currentUser}
    ))
  }

  getAllMilestones(user: VerifiedUser) {
    const extra = new QueryExtras(user, null);
    this.store.dispatch(MSActions.getAllMilestonesAction({extras: extra}));
  }

  goBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
    this.ts.clearAll();
  }
}
