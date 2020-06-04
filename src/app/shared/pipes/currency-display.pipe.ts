import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({
  name: 'currencyDisplay',
  pure: true
})
export class CurrencyDisplayPipe implements PipeTransform {

  @memo()
  transform(value: number): any {
    if (value && value > 1000) {
      return this.addComma(value);
    }
    return value;
  }

  addComma(val: number): string {
    const stringVersion = (val+"");
    const portions: string[] =stringVersion.split(".");
    const decimalsPortion: string = portions[1]
    const intPortion: string = portions[0];

    const arrayOfNumbersReversed = intPortion.split("").reverse();
    const resArr = [];
    for (let i=0; i<arrayOfNumbersReversed.length; i++) {
      resArr.push(arrayOfNumbersReversed[i])
      if ((i+1 < arrayOfNumbersReversed.length) && ((i+1) % 3 === 0)) {
        resArr.push(",")
      }
    }
    const result = resArr.reverse().join("") + (decimalsPortion ? ("." + decimalsPortion) : "");
    return result;
  }
}
