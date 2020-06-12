import { Component, OnInit, OnDestroy, ViewChild, ElementRef,
  AfterViewInit, Input, OnChanges } from '@angular/core';
import * as Chart from 'chart.js'
import { IJobConfig, IJobConfigColumn } from '../../../../shared/models/job-config.model';
import { replaceToZero, getCompanyColor, capitalizeFirstLetter, roundTo2Places,
  caluclateTotalComp,
  condenseCompanyName} from '../../../../shared/utils/general.utils';
import { getPointStyle, getCategoryColor } from '../../../../shared/utils/graph-utils';
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

  createGrpah() {
    if (this.msConfigs && this.msConfigs.length > 0) {
      this.noData = false;

      this.canvas = document.getElementById('msChart');
      this.canvasTcChange = document.getElementById('msChartTcChange');
      this.canvasTenure = document.getElementById('msChartTenure');

      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, this.createConfig());
      }
      if (this.canvasTcChange) {
        this.ctxTcChange = this.canvasTcChange.getContext('2d');
        let myChartTcChange = new Chart(this.ctxTcChange, this.createChangeByYearConfig());
      }
      if (this.canvasTenure) {
        this.ctxTenure = this.canvasTenure.getContext('2d');
        let myChartTenure = new Chart(this.ctxTenure, this.createDurationConfig());
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
      data: this.createDurationData(),
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
              const readable = "" + (year ? year + " year " : "") + (month ? month + " months" : "");

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

  createDurationData(): Chart.ChartData {
    let companies: Set<string> = new Set();
    const pieColors: string[] = [];
    const durationData: number[] = [];
    const configs = [...this.msConfigs];

    const sortedByStartDate: IJobConfig[] = _.sortBy(configs, (conf: IJobConfig) => {
      return conf.dateStarted.value;
    })

    let startOfCurrent = sortedByStartDate[0];
    sortedByStartDate.forEach((conf: IJobConfig, index: number) => {
      companies.add(condenseCompanyName(conf.companyName));

      if (sortedByStartDate[index].companyName !== startOfCurrent.companyName) {
        const dur = sortedByStartDate[index].dateStarted.value - startOfCurrent.dateStarted.value;
        durationData.push(dur);
        startOfCurrent = sortedByStartDate[index];
      }

    });

    const companyArr = [...companies];
    companyArr.forEach((c) => {
      pieColors.push(getCompanyColor(c));
    });

    return {
      labels: [...companies],
      datasets: [{
        data: [...durationData],
        backgroundColor: [...pieColors],
        label: 'Tenure Duration'
      }],
    }
  }

  ngOnDestroy() {

  }
}
