import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { LoadingModule } from '../shared/loading/loading.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    PipeBundleModule,
    LoadingModule,
    SettingsRoutingModule

  ],

  exports: [

  ],

  declarations: [
    SettingsComponent
  ],

  providers: [

  ],
})
export class SettingsModule { }
