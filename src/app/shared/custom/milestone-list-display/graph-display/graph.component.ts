import { Component, OnInit, OnDestroy, ViewChild, ElementRef,
  AfterViewInit, Input, OnChanges } from '@angular/core';
import * as Chart from 'chart.js'
import { IJobConfig, IJobConfigColumn } from '../../../../shared/models/job-config.model';
import { replaceToZero, getCompanyColor, capitalizeFirstLetter, roundTo2Places,
  caluclateTotalComp,
  condenseCompanyName} from '../../../../shared/utils/general.utils';
import { getPointStyle, getCategoryColor, CompanyDuration } from '../../../../shared/utils/graph-utils';
import { CurrencyDisplayPipe } from '../../../../shared/pipes/currency-display.pipe';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-milestone-graph-display',
  templateUrl: 'graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class MilestoneGraphDisplayComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input()
  msConfigs: IJobConfig[] = [];

  canvas: any;
  ctx: any;
  canvasTcChange: any;
  ctxTcChange: any;
  canvasTenure: any;
  ctxTenure: any;

  tcChart: Chart;
  categoryChart: Chart;
  durationChart: Chart;

  noData: boolean = false;
  noDataImgSrc: string = "assets/img/graph-chart.jpg";

  constructor(private cdp: CurrencyDisplayPipe) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.createGrpah();
  }

  ngAfterViewInit() {
    this.createGrpah();
  }

  /**
   * Chart will not re-draw if it already has been drawn once.
   */
  createGrpah() {
    if (this.msConfigs && this.msConfigs.length > 0) {
      this.noData = false;

      this.canvas = document.getElementById('msChart');
      this.canvasTcChange = document.getElementById('msChartTcChange');
      this.canvasTenure = document.getElementById('msChartTenure');

      if (this.canvas && !this.categoryChart) {
        this.ctx = this.canvas.getContext('2d');
        this.categoryChart = new Chart(this.ctx, this.createConfig());
      }
      if (this.canvasTcChange && !this.tcChart) {
        this.ctxTcChange = this.canvasTcChange.getContext('2d');
        this.tcChart = new Chart(this.ctxTcChange, this.createChangeByYearConfig());
      }
      if (this.canvasTenure && !this.durationChart) {
        this.ctxTenure = this.canvasTenure.getContext('2d');
        this.durationChart = new Chart(this.ctxTenure, this.createDurationConfig());
      }
    } else {
      this.noData = true;
    }
  }

  createConfig(): Chart.ChartConfiguration {
    return {
      type: 'bar',
      data: this.createData2(),
      options: {
        responsive: false,
        responsiveAnimationDuration: 1000,
        maintainAspectRatio: true,
        tooltips: {
          mode: 'index',
          intersect: false,
          titleFontSize: 16,
          bodyFontSize: 14,
          bodySpacing: 5,
          xPadding: 8,
          yPadding: 8,
          // Include a dollar sign in tooltip labels
          callbacks: {
            label: function(tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                  label += ': ';
                }
                label += "$" + this.cdp.transform(tooltipItem.yLabel);
                return label;
            }.bind(this)
          }
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#000",
                fontFamily: 'Roboto'
              },
              scaleLabel: {
                fontColor: "#000"
              },
              stacked: true
            }
          ],
          yAxes: [{
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                  return '$' + this.cdp.transform(value);
              }.bind(this)
            },
            stacked: true
          }]
        }
      }
    }
  }

  createData2() {
    // Y-axis
    const labelsToShow: string[] = [];

    const datasetRes: Chart.ChartDataSets[] = [];

    // this is the sections of each bar
    const categoriesToDisplay: string[] = ["Salary", "401k Contribution", "Bonus", "Cashable PTO Value"];
    const categoryIds: string[] = ["salary", "Four1kContribution", "bonus", "cashablePTOInHours"];
    const configs = [...this.msConfigs];

    configs.forEach((c: IJobConfig) => {
      const startDate = moment(c.dateStarted.value).format("MM/YYYY");
      labelsToShow.push(startDate + " (" + condenseCompanyName(c.companyName) +
        ") $" + this.cdp.transform(caluclateTotalComp(c)));
    });

    categoriesToDisplay.forEach((category: string, index: number) => {
      datasetRes.push({
        label: category,
        backgroundColor: getCategoryColor(categoryIds[index])
      })
    });

    datasetRes.forEach((ds, index) => {
      const data: number[] = [];
      configs.forEach((c: IJobConfig) => {
        let value = replaceToZero(c[categoryIds[index]].value);
        if (categoryIds[index] === "cashablePTOInHours") {
          value = (c.hourlyRate.value) * (c.cashablePTOInHours.value);
        }
        data.push(value)
      });
      data.reverse();
      ds.data = [...data];
    });

    labelsToShow.reverse();

    return {
      labels: labelsToShow,
      datasets: datasetRes
    }
  }

  createChangeByYearConfig(): Chart.ChartConfiguration {
    return {
      type: 'line',
      data: this.createChangeByYearData(),
      options: {
        responsive: false,
        responsiveAnimationDuration: 1000,
        maintainAspectRatio: true,
        tooltips: {
          mode: 'index',
          intersect: false,
          titleFontSize: 16,
          bodyFontSize: 14,
          bodySpacing: 5,
          xPadding: 8,
          yPadding: 8,
          // Include a dollar sign in tooltip labels
          callbacks: {
            label: function(tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                  label += ': ';
                }
                label += "$" + this.cdp.transform(tooltipItem.yLabel);
                return label;
            }.bind(this)
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                  return '$' + this.cdp.transform(value);
              }.bind(this)
            }
          }],
          xAxes: [
            {
              ticks: {
                fontColor: "#000",
                fontFamily: 'Roboto'
              },
              scaleLabel: {
                fontColor: "#000"
              }
            }
          ]
        }
      }
    }
  }

  createChangeByYearData(): Chart.ChartData {
    const years: string[] = [];
    const datasetRes: Chart.ChartDataSets[] = [];
    const dataArray: any[] = [];
    const configs = [...this.msConfigs];

    configs.forEach((c: IJobConfig) => {
      const startDate = moment(c.dateStarted.value).format("MM/YYYY");
      years.push(startDate + " (" + condenseCompanyName(c.companyName) + ")");
      const tc: number = caluclateTotalComp(c);
      dataArray.push(tc);
    });

    years.reverse();
    dataArray.reverse();

    datasetRes.push({
      label: "Total Comp.",
      data: [...dataArray],
      backgroundColor: "#006622",
      borderColor: "#006622",
      fill: false,
      steppedLine: "before",
      spanGaps: true
    })

    return {
      labels: [...years],
      datasets: datasetRes
    }
  }

  createDurationConfig(): Chart.ChartConfiguration {
    return {
      type: "pie",
      data: this.createDurationData2(),
      options: {
        responsive: true,
        responsiveAnimationDuration: 1000,
        maintainAspectRatio: true,
        tooltips: {
          // mode: 'index',
          // intersect: false,
          titleFontSize: 16,
          bodyFontSize: 14,
          bodySpacing: 5,
          xPadding: 8,
          yPadding: 8,
          // Include a dollar sign in tooltip labels
          callbacks: {
            label: function(tooltipItem, data) {
              const dataValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              let label = "";
              label += data.labels[tooltipItem.index];
              const year = moment.duration(dataValue).years();
              const month = moment.duration(dataValue).months();
              let readable = "" + (year ? year + " year " : "") + (month ? month + " months" : "");
              if (readable.trim() === "" || readable === "undefined" || readable === "null") {
                readable = moment.duration(dataValue).humanize();
              }
              label += ": " + readable;
              return label;
            }.bind(this)
          }
        },
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true
          }
        }
      }
    }
  }

  createDurationData2() {
    let com: Set<string> = new Set();
    const configs = [...this.msConfigs];
    const pieColors: string[] = [];
    const sortedByStartDate: IJobConfig[] = _.sortBy(configs, (conf: IJobConfig) => {
      return conf.dateStarted.value;
    });

    sortedByStartDate.forEach((conf: IJobConfig, index: number) => {
      com.add((conf.companyName.toLowerCase()));
    });
    const comArr = [...com];
    let coDurs: {[key: string]: CompanyDuration} = {};
    comArr.forEach((c) => {
      coDurs[c.toLowerCase()] = new CompanyDuration(c.toLowerCase(), 0);
    });

    sortedByStartDate.forEach((jc: IJobConfig, i: number) => {
      let nextJob: number = new Date().getTime();
      if (i < (sortedByStartDate.length - 1)) {
        nextJob = sortedByStartDate[i+1].dateStarted.value;
      }
      const currentJob = sortedByStartDate[i].dateStarted.value;
      const dur = nextJob - currentJob;
      coDurs[jc.companyName.toLowerCase()].dur = (coDurs[jc.companyName.toLowerCase()].dur + dur);
    });

    let displayLabels: string[] = [];
    let displayData: number[] = [];

    Object.keys(coDurs).forEach((cd) => {
      displayLabels.push(condenseCompanyName(cd));
      displayData.push(coDurs[cd].dur);
      pieColors.push(getCompanyColor(coDurs[cd].name));
    });

    return {
      labels: [...displayLabels],
      datasets: [{
        data: [...displayData],
        backgroundColor: [...pieColors],
        label: 'Tenure Duration'
      }],
    }
  }

  ngOnDestroy() {

  }
}
