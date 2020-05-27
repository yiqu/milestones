import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthSigninComponent } from './signin/signin.component';
import { AuthSignupComponent } from './signup/signup.component';
import { AuthUserAlreadyLoggedInGuard } from '../shared/route-guards/verified-user.guard';

const routes: Routes = [
  { path: '', component: AuthComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: AuthSigninComponent,
        //canActivate: [AuthUserAlreadyLoggedInGuard]
      },
      { path: 'signup', component: AuthSignupComponent,
        //canActivate: [AuthUserGuard]
      },
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
