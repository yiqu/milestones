import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { MaterialModuleBundle } from '../../material-bundle.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipeBundleModule } from '../../pipes/pipe-bundle.module';
import { CurrencyDisplayPipe } from '../../pipes/currency-display.pipe';
import { DateDisplayPipe } from '../../pipes/time-utils.pipe';


@NgModule({
  imports: [
    MaterialModuleBundle,
    FormsModule,
    CommonModule,
    PipeBundleModule
  ],
  exports: [TableComponent],

  declarations: [TableComponent],

  providers: [
    CurrencyDisplayPipe,
    DateDisplayPipe
  ],
})
export class TableModule { }
