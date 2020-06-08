import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { CurrencyDisplayPipe } from './currency-display.pipe';
import { stripCommas } from '../utils/general.utils';

const PRIVATE_KEYS: string[] = ["dateStarted", "user", "endYear", "firebaseId", "companyName"];

@Pipe({
  name: 'getObjectKeys',
  pure: true
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: any): any[] {
    if (value) {
      return Object.keys(value).filter(
        (val) => {
          if (PRIVATE_KEYS.includes(val)) {
            return false;
          }
          return true;
        }
      ).sort(
        (a, b) => {
          if (a.toLowerCase() > b.toLowerCase()) {
            return -1;
          }
          if (a.toLowerCase() < b.toLowerCase()) {
            return 1;
          }
        }
      );
    }
    return [];
  }
}

@Pipe({
  name: 'milestoneLabelDisplay',
  pure: true
})
export class MilestoneLabelPipe implements PipeTransform {

  @memo()
  transform(value: string): string {
    let res: string = "Unknown Label";
    switch(value) {
      case "projectedPTOInDays": {
        res = "Annual PTO Usage";
        break;
      }
      case "bonus": {
        res = "Year End Bonus";
        break;
      }
      case "Four1kContribution": {
        res = "Annual 401k Deposit";
        break;
      }
      case "hourlyRate": {
        res = "Hourly Rate";
        break;
      }
      case "salary": {
        res = "Base Salary";
        break;
      }
      case "cashablePTOInHours": {
        res = "Cashable PTO";
        break;
      }
    }
    return res + ": ";
  }
}


@Pipe({
  name: 'milestoneUnitDisplay',
  pure: true
})
export class MilestoneValUnitPipe implements PipeTransform {

  constructor(private cdp: CurrencyDisplayPipe) {

  }

  transform(val: string, label: any): string {
    let res: string = "";
    switch(label) {
      case "projectedPTOInDays": {
        res = val + " days";
        break;
      }
      case "bonus": {
        res = "$" + this.cdp.transform(+val);
        break;
      }
      case "Four1kContribution": {
        res = "$" + this.cdp.transform(stripCommas(val));
        break;
      }
      case "hourlyRate": {
        res = "$" + this.cdp.transform(stripCommas(val));
        break;
      }
      case "salary": {
        res = "$" + this.cdp.transform(stripCommas(val));
        break;
      }
      case "cashablePTOInHours": {
        res = val + " hours";
        break;
      }
    }
    return res;
  }
}



@Pipe({
  name: 'companyLogoUrl',
  pure: true
})
export class CompanyLogoUrlPipe implements PipeTransform {

  @memo()
  transform(value: string): any {
    let url: string = "assets/company/";
    let name: string = "";
    if (value) {
      const trimmed = value.trim().toLowerCase().replace(" ", "");
      if (trimmed.includes("dynamics") || trimmed.includes("general")) {
        name = "gdms";
      } else if (trimmed.includes("amazon") || trimmed.includes("amaz")) {
        name = "amazon";
      }
      else if (trimmed.includes("praxis") || trimmed.includes("prax")) {
        name = "praxis";
      }
      else if (trimmed.includes("omnyon") || trimmed.includes("omnyonllc")) {
        name = "omnyonllc";
      } else {
        return "assets/banner/milestones-banner.jpg";
      }
    }
    return url + name + ".png";
  }
}

