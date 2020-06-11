import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-milestone-new-add-percent',
  templateUrl: 'percent.component.html',
  styleUrls: ['./percent.component.css']
})
export class AddNewPercentComponent implements OnInit, OnChanges {

  @Output()
  valueChange: EventEmitter<IPercentOption> = new EventEmitter<IPercentOption>();

  options: IPercentOption[] = [];
  selectedValue: IPercentOption = null;

  constructor() {
    this.options = [
      {value: 0.01, display: "1%"},
      {value: 0.02, display: "2%"},
      {value: 0.03, display: "3%"},
      {value: 0.04, display: "4%"},
      {value: 0.045, display: "4.5%"},
      {value: 0.05, display: "5%"},
      {value: 0.055, display: "5.5%"},
      {value: 0.06, display: "6%"},
      {value: 0.065, display: "6.5%"},
      {value: 0.07, display: "7%"},
      {value: 0.075, display: "7.5%"},
      {value: 0.08, display: "8%"},
      {value: 0.085, display: "8.5%"},
      {value: 0.09, display: "9%"},
      {value: 0.095, display: "9.5%"},
      {value: 0.1, display: "10%"},
      {value: 0.15, display: "15%"},
    ]
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onValueChange() {
    this.valueChange.emit(this.selectedValue);
  }

  resetValue() {
    this.selectedValue = null;
  }
}

export interface IPercentOption {
  value: number;
  display: string;
}
