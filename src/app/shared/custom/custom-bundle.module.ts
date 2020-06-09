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
  ],

  exports: [
    MilestoneDisplayComponent,
    DialogConfirmComponent,
    MilestoneAddComponent,
    MilestoneListComponent,
    PersonalEmptyComponent,
    MilestoneGraphDisplayComponent
  ],

  declarations: [
    MilestoneDisplayComponent,
    DialogConfirmComponent,
    MilestoneAddComponent,
    MilestoneListComponent,
    PersonalEmptyComponent,
    MilestoneGraphDisplayComponent
  ],

  providers: [

  ],
})
export class CustomComponentsModule { }
