import { Component, OnInit, OnDestroy, ViewChild, ElementRef,
  AfterViewInit, Input, OnChanges } from '@angular/core';
import * as Chart from 'chart.js'
import { IJobConfig, IJobConfigColumn } from '../../../../shared/models/job-config.model';
import { replaceToZero, getCompanyColor, capitalizeFirstLetter, roundTo2Places,
  caluclateTotalComp } from '../../../../shared/utils/general.utils';
import { getPointStyle } from '../../../../shared/utils/graph-utils';
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
      type: 'line',
      data: this.createData(),
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
          ],
          yAxes: [{
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                  return '$' + this.cdp.transform(value);
              }.bind(this)
            }
          }]
        }
      }
    }
  }

  createData(): Chart.ChartData {
    const labelsToShow = ["Base Salary", "401k Contribution", "Bonus", "Cashable PTO Value"];
    const datasetRes: Chart.ChartDataSets[] = [];

    this.msConfigs.forEach((c: IJobConfig) => {
      // get all possible years
      const currentYear = moment(c.dateStarted.value).year() + "";
      const data = [];
      const cashablePtoValue: number = (c.hourlyRate.value) * (c.cashablePTOInHours.value);
      data.push(replaceToZero(c.salary.value),
        replaceToZero(c.Four1kContribution.value),
        replaceToZero(c.bonus.value),
        replaceToZero(roundTo2Places(cashablePtoValue))
      );
      const datasetColor = getCompanyColor(c.companyName);

      datasetRes.push({
        label: (currentYear + " (" + capitalizeFirstLetter(c.companyName) + ")"),
        data: data,
        backgroundColor: datasetColor,
        borderColor: datasetColor,
        fill: false,
        pointStyle: getPointStyle(c.companyName),
        pointRadius: 4,
      })
    });

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
    let labels: string[] = [];
    const years: number[] = [];
    const datasetRes: Chart.ChartDataSets[] = [];
    const dataArray: any[] = [];
    this.msConfigs.forEach((c: IJobConfig) => {
      // get all possible years
      const currentYear = moment(c.dateStarted.value).year();
      years.push(currentYear);
    });

    const min = Math.min(...years);
    const max = Math.max(...years);
    for (let i=min; i<=max; i++) {
      labels.push(i+"");
    }

    let prevYearData: IJobConfig;
    labels.forEach((y: string, i: number) => {
      let currentYear = y;
      const currentYearData = this.msConfigs.find((c: IJobConfig) => {
        const year = moment(c.dateStarted.value).year();
        return (+currentYear) === year;
      });

      // found the year. ex. 2010===2010 in the list of milestones
      if (currentYearData) {
        const tc: number = caluclateTotalComp(currentYearData);
        dataArray.push(tc);
        prevYearData = currentYearData;
      } else {
        const tc: number = caluclateTotalComp(prevYearData);
        dataArray.push(tc);
      }
    })

    datasetRes.push({
      label: "Total Comp.",
      data: [...dataArray],
      backgroundColor: "#006622",
      borderColor: "#006622",
      fill: false,
      steppedLine: "before",
      spanGaps: true
    })

    labels.forEach((y: string, i: number) => {
      const currentYearData = this.msConfigs.find((c: IJobConfig) => {
        const year = moment(c.dateStarted.value).year();
        return (+y) === year;
      });
      if (currentYearData) {
        labels[i] = labels[i] + " (" + capitalizeFirstLetter(currentYearData.companyName) + ")";
      }
    });

    return {
      labels: labels,
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
              let label = data.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              const readable = moment.duration(dataValue, "ms").humanize();
              label += readable + " ";
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
    const startDates: number[] = [];
    const durationData: number[] = [];

    this.msConfigs.forEach((ms: IJobConfig) => {
      companies.add(ms.companyName);
      pieColors.push(getCompanyColor(ms.companyName));
      startDates.push(ms.dateStarted.value);
    });

    const labels: string[] = [...companies];
    const sortedByStartDate: IJobConfig[] = _.sortBy(this.msConfigs, (conf: IJobConfig) => {
      return conf.dateStarted.value;
    })

    sortedByStartDate.forEach((conf: IJobConfig, index: number) => {
      if (index < sortedByStartDate.length - 1) {
        const dur = (+sortedByStartDate[index + 1].dateStarted.value) - (+sortedByStartDate[index].dateStarted.value);
        durationData.push(dur);
      }
      else {
        const dur = (new Date().getTime()) - (+sortedByStartDate[index].dateStarted.value);
        durationData.push(dur);
      }
    });

    return {
      datasets: [{
        data: [...durationData],
        backgroundColor: [...pieColors],
        label: 'Tenure Duration'
      }],
      labels: labels
    }
  }

  ngOnDestroy() {

  }
}
