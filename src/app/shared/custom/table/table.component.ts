import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IJobConfigColumn, IJobConfig, JobConfigColumn } from '../../models/job-config.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { caluclateTotalComp } from '../../utils/general.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shared-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['endYear', 'companyName', 'totalComp', 'salary', 'hourlyRate', 'cashablePTOInHours',
    'projectedPTOInDays', 'bonus', 'Four1kContribution' , 'dateStarted'];
  dataSource: MatTableDataSource<IJobConfigColumn>;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @Input()
  mileStones: IJobConfig[] = [];

  constructor() {
    if (!environment.production) {
      this.displayedColumns.push('firebaseId');
    }
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.transformMilestoneData(this.mileStones));
  }

  transformMilestoneData(ms: IJobConfig[]) {
    let res: IJobConfigColumn[] = [];
    ms.forEach((d: IJobConfig) => {
      const totalComp = caluclateTotalComp(d, true);
      let rowData = new JobConfigColumn(d.companyName, d.endYear, totalComp, d.projectedPTOInDays?.value, d.salary?.value,
        d.hourlyRate?.value, d.cashablePTOInHours?.value, d.Four1kContribution?.value, d.bonus?.value,
        d.dateStarted?.value, d.user, d.firebaseId);
      res.push(rowData);
    });
    return res;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
