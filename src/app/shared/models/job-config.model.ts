import { VerifiedUser } from './user.model';

export interface IJobConfig {
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
    public endYear: number,
    public projectedPTOInDays: FormValue,
    public salary: FormValue,
    public hourlyRate: FormValue,
    public cashablePTOInHours: FormValue,
    public Four1kContribution: FormValue,
    public bonus: FormValue,
    public dateStarted: FormValue,
    public user: VerifiedUser
  ) {

  }
}

/**
 * Form value models
 */
export interface IJobConfigFormValue {
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
}
