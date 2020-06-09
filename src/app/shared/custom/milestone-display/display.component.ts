import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { IJobConfig } from '../../models/job-config.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog/dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { caluclateTotalComp } from '../../utils/general.utils';

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

  @Output()
  calculatedTotalComp: EventEmitter<any> = new EventEmitter<any>();

  compDest$: Subject<any> = new Subject<any>();
  companyName: string;
  dateStarted: number;
  subtitlePrefix: string = "Started this job on ";
  totalComp: any;
  showCalc: boolean = false;
  calculationWorkText: string;

  constructor(public dialog: MatDialog) {

  }

  ngOnChanges(c) {
    this.companyName = this.config.companyName ? this.config.companyName : "No Company Name";
    this.dateStarted = this.config.dateStarted.value;
    this.totalComp = caluclateTotalComp(this.config);
    this.calculationWorkText = this.getCalcText();
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

  onShowCalcToggle() {
    this.showCalc = !this.showCalc;
  }

  getCalcText(): string {
    const cashablePtoInValue = this.config?.cashablePTOInHours?.value * this.config?.hourlyRate?.value;
    return "Salary of $" + this.config.salary.value + " + $" + cashablePtoInValue +
    " (" + this.config.cashablePTOInHours.value + "h (cashable pto) * $" + this.config.hourlyRate.value
    + " (hourly rate)" + ") + $" + this.config.bonus.value + " (bonus) + $" +
    this.config.Four1kContribution.value + " (401k)";
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
