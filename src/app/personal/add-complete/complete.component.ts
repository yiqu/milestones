import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store"
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { IMilestonePersonalState } from '../../shared/redux-stores/milestone/milestone.model';
import { IJobConfig } from '../../shared/models/job-config.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as MSAction from '../../shared/redux-stores/milestone/milestone.actions';

@Component({
  selector: 'app-personal-add-complete',
  templateUrl: 'complete.component.html',
  styleUrls: ['./complete.component.css', '../personal.component.css']
})
export class PersonalAddCompleteComponent implements OnInit, OnDestroy {

  addedMileStone: IJobConfig;
  dataFields: string[];
  compDest$: Subject<any> = new Subject<any>();

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() {
    this.store.select("personal").pipe(
      takeUntil(this.compDest$)
    )
    .subscribe(
      (state: IMilestonePersonalState) => {
        this.addedMileStone = state.crudData;
      }
    )
  }

  edit() {
    if (this.addedMileStone) {
      this.store.dispatch(MSAction.editMilestoneStartAction({payload: this.addedMileStone}));
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }

}
