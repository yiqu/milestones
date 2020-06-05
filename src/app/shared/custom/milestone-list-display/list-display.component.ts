import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IJobConfig } from '../../models/job-config.model';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, fadeOutDownOnLeaveAnimation } from 'angular-animations';

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
export class MilestoneListComponent implements OnInit {

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

  constructor() {

  }

  ngOnInit() {

  }

  onEdit(i: number) {
    this.editAction.emit(i);
  }

  onDelete(i: number) {
    this.deleteAction.emit(i);
  }
}
