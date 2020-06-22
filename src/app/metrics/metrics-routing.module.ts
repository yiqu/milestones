import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetricsComponent } from './metrics.component';
import { NoVerifiedUserGuard, NoVerifiedUserChildrenGuard } from '../shared/route-guards/no-user.guard';

const routes: Routes = [
  { path: '', component: MetricsComponent, canActivate: [NoVerifiedUserGuard],
    canActivateChild: [NoVerifiedUserChildrenGuard],
    children: [
      { path: '', redirectTo: "metrics", pathMatch: "full" },
      { path: 'metrics', component: MetricsComponent }
    ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class MetricsRoutingModule {}
