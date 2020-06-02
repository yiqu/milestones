import { NgModule } from '@angular/core';
import { MilestoneDisplayComponent } from './milestone-display/display.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../material-bundle.module';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';
import { RouterModule } from '@angular/router';
import { DialogConfirmComponent } from './dialog/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    PipeBundleModule,
    RouterModule
  ],

  exports: [
    MilestoneDisplayComponent,
    DialogConfirmComponent
  ],

  declarations: [
    MilestoneDisplayComponent,
    DialogConfirmComponent
  ],

  providers: [

  ],
})
export class CustomComponentsModule { }
