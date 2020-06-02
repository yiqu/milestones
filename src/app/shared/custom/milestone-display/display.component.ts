import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { IJobConfig } from '../../models/job-config.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog/dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-milestone-display',
  templateUrl: 'display.component.html',
  styleUrls: ['./display.component.css']
})
export class MilestoneDisplayComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  config: IJobConfig;

  @Input()
  enableEditing: boolean;

  @Output()
  deleteAction: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  editAction: EventEmitter<any> = new EventEmitter<any>();

  compDest$: Subject<any> = new Subject<any>();
  companyName: string;
  dateStarted: number;
  subtitlePrefix: string = "Started this job on ";

  constructor(public dialog: MatDialog) {

  }

  ngOnChanges(c) {
    this.companyName = this.config.companyName ? this.config.companyName : "No Company Name";
    this.dateStarted = this.config.dateStarted.value;
  }

  ngOnInit() {
  }


  onEdit() {
    this.editAction.emit();
  }

  onDelete() {
    this.openConfirmDialog();
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {actionName: "delete this entry"}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((result) => {
      if (result) {
        this.deleteAction.emit();
      }
    });
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
