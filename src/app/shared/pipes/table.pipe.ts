import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { CurrencyDisplayPipe } from './currency-display.pipe';
import { DateDisplayPipe } from './time-utils.pipe';

@Pipe({
  name: 'tableColumnDisplay',
  pure: true
})
export class TableColumnDisplayPipe implements PipeTransform {

  @memo()
  transform(value: string): any {
    let res: string = value;

    switch(value) {
      case "endYear": {
        res = "Year";
        break;
      }
      case "companyName": {
        res = "Company";
        break;
      }
      case "salary": {
        res = "Salary";
        break;
      }
      case "totalComp": {
        res = "TC";
        break;
      }
      case "hourlyRate": {
        res = "Hourly";
        break;
      }
      case "cashablePTOInHours": {
        res = "Cashable PTO(h)";
        break;
      }
      case "projectedPTOInDays": {
        res = "Porjected PTO Usage(d)";
        break;
      }
      case "Four1kContribution": {
        res = "401k Deposit";
        break;
      }
      case "dateStarted": {
        res = "Starting Date";
        break;
      }
      case "firebaseId": {
        res = "Fire ID";
        break;
      }
    }
    return res;
  }

}

@Pipe({
  name: 'tableDataDisplay',
  pure: true
})
export class TableDataDisplayPipe implements PipeTransform {

  constructor(public cdp: CurrencyDisplayPipe, private dp: DateDisplayPipe) {
  }

  transform(value: any, colId: string): any {
    let res: any = value;

    switch(colId) {
      case "companyName": {
        res = res.charAt(0).toUpperCase() + res.slice(1);;
        break;
      }
      case "salary": {
        res = "$" + this.cdp.transform(res);
        break;
      }
      case "totalComp": {
        res = "$" + this.cdp.transform(res);
        break;
      }
      case "hourlyRate": {
        res = "$" + this.cdp.transform(res);
        break;
      }
      case "bonus": {
        res = "$" + this.cdp.transform(res);
        break;
      }
      case "cashablePTOInHours": {
        res = res + " hours";
        break;
      }
      case "projectedPTOInDays": {
        res = res + " days";
        break;
      }
      case "Four1kContribution": {
        res = "$" + this.cdp.transform(res);
        break;
      }
      case "dateStarted": {
        res = this.dp.transform(res, 'MDYANDFROMNOW');
        break;
      }
      case "firebaseId": {
        res = res.slice(-5);
        break;
      }
    }
    return res;
  }

}
