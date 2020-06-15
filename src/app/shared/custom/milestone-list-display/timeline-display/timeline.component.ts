import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TimelineEvent, IJobConfig, ITimelineEvent } from '../../../../shared/models/job-config.model';
import { condenseCompanyName, caluclateTotalComp } from '../../../../shared/utils/general.utils';
import { CurrencyDisplayPipe } from '../../../../shared/pipes/currency-display.pipe';

@Component({
  selector: 'app-milestone-timeline-display',
  templateUrl: 'timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class MilestoneTimelineComponent implements OnInit, OnChanges {

  events: ITimelineEvent[] = [];
  noDataImgSrc: string = "assets/img/graph-chart.jpg";

  @Input()
  msConfigs: IJobConfig[] = [];

  constructor(private cdp: CurrencyDisplayPipe) {

  }

  ngOnInit() {

  }

  ngOnChanges(c) {
    this.msConfigs.forEach((c: IJobConfig) => {
      const date = c.dateStarted.value ? new Date(c.dateStarted.value) : new Date(0);
      const body = "TC: $" + this.cdp.transform(caluclateTotalComp(c))
      const newEvent = new TimelineEvent(date, condenseCompanyName(c.companyName),
        body);

      this.events.push(newEvent);
    });
  }
}
