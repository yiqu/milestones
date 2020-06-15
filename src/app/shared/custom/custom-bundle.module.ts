import { NgModule } from '@angular/core';
import { MilestoneDisplayComponent } from './milestone-display/display.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../material-bundle.module';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';
import { RouterModule } from '@angular/router';
import { DialogConfirmComponent } from './dialog/dialog.component';
import { MilestoneAddComponent } from './milestone-new/new.component';
import { LoadingModule } from '../loading/loading.module';
import { MilestoneListComponent } from './milestone-list-display/list-display.component';
import { PersonalEmptyComponent } from './empty/empty.component';
import { TableModule } from './table/table.module';
import { MilestoneGraphDisplayComponent } from './milestone-list-display/graph-display/graph.component';
import { AddNewPercentComponent } from './milestone-new/percent-option/percent.component';
import { MilestoneTimelineComponent } from './milestone-list-display/timeline-display/timeline.component';
import { NgxTimelineModule } from 'ngx-timeline';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    PipeBundleModule,
    RouterModule,
    LoadingModule,
    TableModule,
    NgxTimelineModule
  ],

  exports: [
    MilestoneDisplayComponent,
    DialogConfirmComponent,
    MilestoneAddComponent,
    AddNewPercentComponent,
    MilestoneListComponent,
    PersonalEmptyComponent,
    MilestoneGraphDisplayComponent,
    MilestoneTimelineComponent
  ],

  declarations: [
    MilestoneDisplayComponent,
    DialogConfirmComponent,
    MilestoneAddComponent,
    AddNewPercentComponent,
    MilestoneListComponent,
    PersonalEmptyComponent,
    MilestoneGraphDisplayComponent,
    MilestoneTimelineComponent
  ],

  providers: [

  ],
})
export class CustomComponentsModule { }
