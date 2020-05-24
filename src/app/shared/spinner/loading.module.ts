import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './loading.component';

@NgModule({
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  exports: [LoadingSpinnerComponent],
  declarations: [LoadingSpinnerComponent],
  providers: [],
})
export class LoadingSpinnerModule { }
