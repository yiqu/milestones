import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateDisplay', pure: true})
export class DateDisplayPipe implements PipeTransform {

  transform(value: any, displayType: string): any {
    if (value || (value === 0)) {
      const dateMilli = +value;
      switch (displayType) {
        case "FROMNOW": {
          return moment(dateMilli).fromNow();
        }
        case "FULLDATE": {
          return moment(dateMilli).format("MM/DD/YY, h:mm a");
        }
        case "INPUTDATE": {
          return moment(dateMilli).format("MM/DD/YY, HH:mm");
        }
        case "FULLANDFROMNOW": {
          return moment(dateMilli).format("MM/DD/YY, h:mm a") + " (" + moment(dateMilli).fromNow() + ")";
        }
        default: {
          return value;
        }
      }
    }
    return "BAD DATE / NO DATE";

  }
}
