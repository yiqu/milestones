import { NgModule } from '@angular/core';
import { CountNumberDisplayPipe } from './count-display.pipe';
import { PluralDisplayPipe } from './plural.pipe';
import { DateDisplayPipe } from './time-utils.pipe';
import { UserDisplayPipe } from './user.pipe';
import { CapitalizeFirstLetterPipe } from './letters.pipe';
import { CurrencyDisplayPipe } from './currency-display.pipe';

@NgModule({
  imports: [],

  exports: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    UserDisplayPipe,
    CapitalizeFirstLetterPipe,
    CurrencyDisplayPipe
  ],

  declarations: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    UserDisplayPipe,
    CapitalizeFirstLetterPipe,
    CurrencyDisplayPipe
  ],

  providers: [],
})
export class PipeBundleModule { }
