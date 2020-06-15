import { NgModule } from '@angular/core';
import { CountNumberDisplayPipe } from './count-display.pipe';
import { PluralDisplayPipe } from './plural.pipe';
import { DateDisplayPipe } from './time-utils.pipe';
import { UserDisplayPipe } from './user.pipe';
import { CapitalizeFirstLetterPipe } from './letters.pipe';
import { CurrencyDisplayPipe } from './currency-display.pipe';
import { ObjectKeysPipe, MilestoneLabelPipe, MilestoneValUnitPipe, CompanyLogoUrlPipe, CompanyNameColorPipe } from './general.pipe';
import { TableColumnDisplayPipe, TableDataDisplayPipe } from './table.pipe';

@NgModule({
  imports: [],

  exports: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    UserDisplayPipe,
    CapitalizeFirstLetterPipe,
    CurrencyDisplayPipe,
    ObjectKeysPipe,
    MilestoneLabelPipe,
    MilestoneValUnitPipe,
    CompanyLogoUrlPipe,
    TableColumnDisplayPipe,
    TableDataDisplayPipe,
    CompanyNameColorPipe
  ],

  declarations: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    UserDisplayPipe,
    CapitalizeFirstLetterPipe,
    CurrencyDisplayPipe,
    ObjectKeysPipe,
    MilestoneLabelPipe,
    MilestoneValUnitPipe,
    CompanyLogoUrlPipe,
    TableColumnDisplayPipe,
    TableDataDisplayPipe,
    CompanyNameColorPipe
  ],

  providers: [],
})
export class PipeBundleModule { }
