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
    const arrayOfNumbersReversed = (val+"").split("").reverse();
    const resArr = [];
    for (let i=0; i<arrayOfNumbersReversed.length; i++) {
      resArr.push(arrayOfNumbersReversed[i])
      if ((i+1 < arrayOfNumbersReversed.length) && ((i+1) % 3 === 0)) {
        resArr.push(",")
      }
    }
    return resArr.reverse().join("");
  }
}
