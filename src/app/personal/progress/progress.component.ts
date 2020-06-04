import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { Subject } from 'rxjs';
import { IJobConfig } from '../../shared/models/job-config.model';
import { AppState } from 'src/app/shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import * as MSAction from '../../shared/redux-stores/milestone/milestone.actions';
import { takeUntil } from 'rxjs/operators';
import { QueryExtras } from 'src/app/shared/redux-stores/milestone/milestone.model';

@Component({
  selector: 'app-personal-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class PersonalProgressComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  allMilestones: IJobConfig[] = [];
  loading: boolean = true;
  pageTitle: string;

  constructor(public ts: ToasterService, public store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.select("personal").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (data) => {
        this.allMilestones = data.payloadData;
        this.loading = data.loading;
      }
    );

    this.store.select("appAuth").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (data) => {
        if (data.verifiedUser) {
          const extra = new QueryExtras(data.verifiedUser, null);
          this.store.dispatch(MSAction.getAllMilestonesAction({extras: extra}));
        }
      }
    );
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
    this.ts.clearAll();
  }
}
