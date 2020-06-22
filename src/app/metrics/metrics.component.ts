import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { IJobConfig } from '../shared/models/job-config.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMilestonePersonalState, QueryExtras } from '../shared/redux-stores/milestone/milestone.model';
import * as fromMsActions from '../shared/redux-stores/milestone/milestone.actions';
import { VerifiedUser } from '../shared/models/user.model';
import * as moment from 'moment';
import { condenseCompanyName, roundToInteger, roundTo2Places, caluclateTotalComp } from '../shared/utils/general.utils';

@Component({
  selector: 'app-metrics',
  templateUrl: 'metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit, OnDestroy {

  configs: IJobConfig[];
  compDest$: Subject<any> = new Subject<any>();
  totalMilestonesCount: number = 0;
  workingYears: string;
  firstMilestone: IJobConfig;
  loading: boolean = true;
  avgLengthAtAJob: number;
  noMilestones: boolean = true;

  avgAllJobs: number = 4.2;
  avgCsJobsRecentTenure: number = 5;
  avgFangJobTenure: number = 2.3;

  avgAnnualTcIncrease: number;
  firstJobSalary: number;
  lastJobSalary: number;
  totalGainInSalary: number;
  totalWorkingYears: number;

  svAvgImgUrl: string = "assets/metrics/avgtechtenure.png";
  fangAvgImgUrl: string = "assets/metrics/blindavg.png";

  constructor(private store: Store<AppState>) {
    this.store.select("appAuth").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (data) => {
        this.getAllMilestones(data.verifiedUser);
      }
    );

    this.store.select("personal").pipe(
      takeUntil(this.compDest$)
    )
    .subscribe(
      (res: IMilestonePersonalState) => {
        this.noMilestones = res.payloadData.length > 0 ? false : true;
        this.loading = res.loading;
        this.configs = res.payloadData;
        this.totalMilestonesCount = this.getTotalUniqueMilestoneCount();
        if (this.totalMilestonesCount > 0) {
          this.workingYears = this.calculateTotalYearsDuration();
          this.firstMilestone = this.getFirstJob();
          this.avgLengthAtAJob = this.getAverageLengthAtAJob();
          this.avgAnnualTcIncrease = this.getAverageAnnualTcIncrease();
        }
      }
    );
  }

  ngOnInit() {
  }

  getTotalUniqueMilestoneCount(): number {
    let s: Set<string> = new Set();
    this.configs.forEach((c) => {
      s.add(condenseCompanyName(c.companyName));
    });
    let uniques: string[] = [...s];
    return uniques.length;
  }

  getAllMilestones(user: VerifiedUser) {
    const extra = new QueryExtras(user, null);
    this.store.dispatch(fromMsActions.getAllMilestonesAction({extras: extra}));
  }

  calculateTotalYearsDuration(): string {
    const durInMilli: number = this.getTotalDurationInMilli();
    return roundTo2Places(moment.duration(durInMilli).asYears()) + " years";
  }

  getTotalDurationInMilli(): number {
    const start: number = this.configs[this.configs.length-1].dateStarted.value;
    const end: number = new Date().getTime();
    const total = end - start;
    return total;
  }

  getFirstJob(): IJobConfig {
    return (this.configs[this.configs.length-1]);
  }

  getAverageLengthAtAJob(): number {
    const durInMilli: number = this.getTotalDurationInMilli();
    const years = moment.duration(durInMilli).asYears();
    const avgLengthAtAJob = years / this.configs.length;
    return roundTo2Places(avgLengthAtAJob);
  }

  getAverageAnnualTcIncrease(): number {
    if (this.configs.length > 1) {
      this.lastJobSalary = caluclateTotalComp(this.configs[0], true);
      this.firstJobSalary = caluclateTotalComp(this.configs[this.configs.length - 1], true);
      this.totalGainInSalary = this.lastJobSalary - this.firstJobSalary;
      const workingDuration: number = new Date().getTime() - (this.configs[this.configs.length - 1].dateStarted.value);
      this.totalWorkingYears = roundTo2Places(moment.duration(workingDuration).asYears());
      return roundTo2Places(this.totalGainInSalary / this.totalWorkingYears);
    }
    return null;
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
