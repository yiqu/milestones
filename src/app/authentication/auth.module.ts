import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthSignupComponent } from './signup/signup.component';
import { AuthSigninComponent } from './signin/signin.component';
import { LoadingSpinnerModule } from '../shared/spinner/loading.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeBundleModule,
    MaterialModuleBundle,
    LoadingSpinnerModule,
    AuthRoutingModule
  ],

  exports: [

  ],

  declarations: [
    AuthComponent,
    AuthSigninComponent,
    AuthSignupComponent
  ],

  providers: [

  ],

})
export class AuthModule { }
