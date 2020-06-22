import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { IJobConfig } from '../../models/job-config.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutDownOnLeaveAnimation } from 'angular-animations';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatTab } from '@angular/material/tabs';
import { MilestoneGraphDisplayComponent } from './graph-display/graph.component';

@Component({
  selector: 'app-milestone-list',
  templateUrl: 'list-display.component.html',
  styleUrls: ['./list-display.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    fadeOutDownOnLeaveAnimation()
  ]
})
export class MilestoneListComponent implements OnInit, OnDestroy {

  @Input()
  loading: boolean;

  @Input()
  allMilestones: IJobConfig[];

  @Input()
  editingMode: boolean;

  @Output()
  editAction: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  deleteAction: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(MilestoneGraphDisplayComponent)
  graphComp: MilestoneGraphDisplayComponent

  compDest$: Subject<any> = new Subject<any>();
  activeTabIndex: number = 0;

  constructor(public router: Router, public route: ActivatedRoute) {

    this.route.queryParamMap.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((val: ParamMap) => {
      this.setActiveTab(+val.get("tab"));
    });
  }

  ngOnInit() {

  }

  setActiveTab(p: any) {
    if  (p !== undefined && (p > -1 && p < 4)) {
      this.activeTabIndex = +p;
    }
  }

  onEdit(i: number) {
    this.editAction.emit(i);
  }

  onDelete(i: number) {
    this.deleteAction.emit(i);
  }

  onTabChange(tab: {index: number, tab: MatTab}) {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {tab: tab.index}
    });
    if (tab.index === 3) {
      this.graphComp.createGrpah();
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
