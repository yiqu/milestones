import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TimelineEvent, IJobConfig, ITimelineEvent } from '../../../../shared/models/job-config.model';
import { condenseCompanyName, caluclateTotalComp } from '../../../../shared/utils/general.utils';
import { CurrencyDisplayPipe } from '../../../../shared/pipes/currency-display.pipe';
import { IsMobileService } from 'src/app/services/is-mobile.service';
import * as utils from '../../../../shared/utils/general.utils';

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

  constructor(private cdp: CurrencyDisplayPipe, public ims: IsMobileService) {

  }

  ngOnInit() {

  }

  ngOnChanges(c) {
    this.msConfigs.forEach((c: IJobConfig) => {
      const date = c.dateStarted.value ? new Date(c.dateStarted.value) : new Date(0);
      const body = "TC: $" + this.cdp.transform(caluclateTotalComp(c));
      let cssClass: string = "fa-certificate cert-icon";
      if (this.ims.mediaQList.matches) {
        cssClass += " is-mo";
      }
      const newEvent = new TimelineEvent(date, condenseCompanyName(c.companyName),
        body, null, cssClass);

      this.events.push(newEvent);
    });
  }
}
