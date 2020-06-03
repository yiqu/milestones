import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { IJobConfig } from '../../../shared/models/job-config.model';
import { IMilestonePersonalState } from '../../../shared/redux-stores/milestone/milestone.model';
import * as MSActions from "../../../shared/redux-stores/milestone/milestone.actions";

@Component({
  selector: 'app-edit-single',
  templateUrl: 'config.component.html',
  styleUrls: ['./config.component.css']
})
export class PersonalEditConfigComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  configToEdit: IJobConfig;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.select("personal").subscribe(
      (state: IMilestonePersonalState) => {
        this.configToEdit = state.editingConfig;
      }
    )
  }

  onSave(c: IJobConfig) {
    console.log(c)
    if (c.firebaseId) {
      this.store.dispatch(MSActions.editMilestoneSaveStartAction({payload: c}));
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
