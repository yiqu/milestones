import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store"
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { IMilestonePersonalState } from 'src/app/shared/redux-stores/milestone/milestone.model';
import { IJobConfig } from 'src/app/shared/models/job-config.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
        if (this.addedMileStone) {
          this.dataFields = Object.keys(this.addedMileStone);
        }
      }
    )
  }

  edit() {

  }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }

}
