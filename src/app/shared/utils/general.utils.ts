import { SnapshotAction } from '@angular/fire/database';
import { IJobConfig } from '../models/job-config.model';

export function createInitAlias(email: string): string {
  return email.substr(0, email.indexOf("@"));
}

export function addfireKey(c: SnapshotAction<any>[]) {
  return c.map((c: SnapshotAction<any>) => {
    return (
      { fireKey: c.payload.key,
        ...c.payload.val()
      }
    )}
  );
}

export function getPureObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function stripCommas(val: string): number {
  let v = val+"";
  return +(v.replace(",", ""));
}

export function isNumeric(num: any){
  return !isNaN(num);
}

export function getNumeric(res: any): number {
  if (isNumeric(res)) {
    return +res;
  }
  return NaN;
}

  /**
   * Total Comp
   * Base + Cashable PTO * hourly rate + year end bonus + 401k deposit
   */
export function caluclateTotalComp(config: IJobConfig): number {
  if (config) {
    const base = getNumeric(config?.salary?.value);
    const cashablePtoInHours = getNumeric(config?.cashablePTOInHours?.value);
    const hourlyRate = getNumeric(config?.hourlyRate?.value);
    const yearEndBonus = getNumeric(config?.bonus?.value);
    const four1kDepo = getNumeric(config?.Four1kContribution?.value);

    const total: number = base + (cashablePtoInHours * hourlyRate) + yearEndBonus + four1kDepo;
    return total;
  }
  return NaN;
}


export function replaceToZero(res): number {
  if (isNumeric(res)) {
    return +res;
  }
  return 0;
}

export function getCompanyColor(name: string): string {
  let res: string = "#000";
  const n = name.toLowerCase();
  if (n.includes("praxis")) {
    res = "#660000";
  } else if (n.includes("amazon")) {
    res = "#ff751a";
  } else if (n.includes("general") || n.includes("dynamics")) {
    res = "#0040ff";
  } else if (n.includes("omnyon")) {
    res = "#00802b";
  }
  return res;
}


export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function roundTo2Places(num: number): number {
  const n = +num;
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
