import { VerifiedUser } from './user.model';

export interface IJobConfig {
  companyName: string;
  endYear: number;
  projectedPTOInDays: FormValue;
  salary: FormValue;
  hourlyRate: FormValue;
  cashablePTOInHours: FormValue;
  Four1kContribution: FormValue;
  bonus: FormValue;
  dateStarted: FormValue;
  user: VerifiedUser;
  firebaseId?: string;
}

export class JobConfig implements IJobConfig {
  constructor(
    public companyName: string,
    public endYear: number,
    public projectedPTOInDays: FormValue,
    public salary: FormValue,
    public hourlyRate: FormValue,
    public cashablePTOInHours: FormValue,
    public Four1kContribution: FormValue,
    public bonus: FormValue,
    public dateStarted: FormValue,
    public user: VerifiedUser,
    public firebaseId?: string
  ) {

  }
}

/**
 * Form value models
 */
export interface IJobConfigFormValue {
  companyName: string;
  dateStarted: FormValue;
  projectedPTOInDays: FormValue;
  wageRateType: "salary" | "hourly";
  wageRateValue: FormValue;
  cashablePTOInHours: FormValue;
  Four1kContribution: FormValue;
  bonus: FormValue;
}

export interface IFormValue {
  value: any;
  note: string;
}

export class FormValue implements IFormValue {
  constructor(public value: any, public note: string) {

  }

  get getNumericValue() {
    console.log(this.value)
    if (this.value && isNumeric(this.value)) {
      return this.value;
    }
    return NaN;
  }
}

export function isNumeric(num: any){
  return !isNaN(num);
}

export interface IJobConfigColumn {
  companyName: string;
  endYear: number;
  projectedPTOInDays: number;
  salary: number;
  hourlyRate: number;
  cashablePTOInHours: number;
  Four1kContribution: number;
  bonus: number;
  dateStarted: number;
  user: VerifiedUser;
  firebaseId?: string;
}

export class JobConfigColumn implements IJobConfigColumn {
  constructor(
    public companyName: string,
    public endYear: number,
    public totalComp: number,
    public projectedPTOInDays: number,
    public salary: number,
    public hourlyRate: number,
    public cashablePTOInHours: number,
    public Four1kContribution: number,
    public bonus: number,
    public dateStarted: number,
    public user: VerifiedUser,
    public firebaseId?: string) {

  }
}
