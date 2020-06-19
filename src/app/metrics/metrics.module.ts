import { NgModule } from '@angular/core';
import { MetricsComponent } from './metrics.component';
import { MetricsRoutingModule } from './metrics-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { LoadingModule } from '../shared/loading/loading.module';
import { CustomComponentsModule } from '../shared/custom/custom-bundle.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeBundleModule,
    MaterialModuleBundle,
    LoadingModule,
    CustomComponentsModule,
    MetricsRoutingModule
  ],
  exports: [

  ],
  declarations: [
    MetricsComponent
  ],
  providers: [

  ],
})
export class MetricsModule { }
