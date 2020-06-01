import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store"
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { IMilestonePersonalState } from 'src/app/shared/redux-stores/milestone/milestone.model';
import { IJobConfig } from 'src/app/shared/models/job-config.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-add-complete',
  templateUrl: 'complete.component.html',
  styleUrls: ['./complete.component.css', '../personal.component.css']
})
export class PersonalAddCompleteComponent implements OnInit {

  addedMileStone: IJobConfig;
  dataFields: string[];

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() {
    this.store.select("personal").subscribe(
      (state: IMilestonePersonalState) => {
        this.addedMileStone = state.crudData;
        this.dataFields = Object.keys(this.addedMileStone);
      }
    )
  }

  edit() {

  }

  goHome() {
    this.router.navigate(['/']);
  }


}
