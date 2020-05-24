import { NgModule } from '@angular/core';
import { SideNavComponent } from './side-nav.component';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MaterialModuleBundle,
    FormsModule,
    CommonModule,
    RouterModule
  ],

  exports: [
    SideNavComponent
  ],

  declarations: [
    SideNavComponent
  ],

  providers: [

  ],
})
export class SideNavModule { }
