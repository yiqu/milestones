import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoVerifiedUserGuard } from '../shared/route-guards/no-user.guard';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent, canActivate: [NoVerifiedUserGuard],
  }
];


/**
 * Routing module.
 */
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ],

  declarations: []
})
export class SettingsRoutingModule { }
