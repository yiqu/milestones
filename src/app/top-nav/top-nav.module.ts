import { NgModule } from '@angular/core';
import { TopNavComponent } from './top-nav.component';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { CapitalizeFirstLetterPipe } from '../shared/pipes/letters.pipe';

@NgModule({
  imports: [
    MaterialModuleBundle,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    PipeBundleModule
  ],

  exports: [
    TopNavComponent
  ],

  declarations: [
    TopNavComponent
  ],

  providers: [
    CapitalizeFirstLetterPipe
  ],

})
export class TopNavModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faShoppingCart);
  }
}
