import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthSigninComponent } from './signin/signin.component';
import { AuthSignupComponent } from './signup/signup.component';
import { AuthUserAlreadyLoggedInGuard } from '../shared/route-guards/verified-user.guard';

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AuthUserAlreadyLoggedInGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: AuthSigninComponent },
      { path: 'signup', component: AuthSignupComponent },
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
export class AuthRoutingModule {}
