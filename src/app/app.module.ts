import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModuleBundle } from './shared/material-bundle.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { PersonalComponent } from './personal/personal.component';
import { TopNavModule } from './top-nav/top-nav.module';
import { SideNavModule } from './side-nav/side-nav.module';
import { NotFoundComponentModule } from './404/404.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './shared/redux-stores/global-store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appEffects } from './shared/redux-stores/global-store/app.effects';
import { PersonalAddComponent } from './personal/add/add.component';
import { PersonalEditComponent } from './personal/edit/edit.component';
import { PersonalProgressComponent } from './personal/progress/progress.component';
import { LoadingModule } from './shared/loading/loading.module';
import { CurrencyDisplayPipe } from './shared/pipes/currency-display.pipe';
import { DirectivesBundleModule } from './shared/directives/dir-bundle.module';
import { PersonalAddCompleteComponent } from './personal/add-complete/complete.component';
import { CustomComponentsModule } from './shared/custom/custom-bundle.module';
import { PersonalEditConfigComponent } from './personal/edit/edit-config/config.component';
import { PersonalEmptyComponent } from './personal/empty/empty.component';
import { NgxTimelineModule } from 'ngx-timeline';

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    PersonalAddComponent,
    PersonalEditComponent,
    PersonalProgressComponent,
    PersonalAddCompleteComponent,
    PersonalEditConfigComponent,
    PersonalEmptyComponent
  ],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forRoot(appReducers),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 30
    }),
    EffectsModule.forRoot(appEffects),
    BrowserAnimationsModule,
    MaterialModuleBundle,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DirectivesBundleModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      newestOnTop: true,
      iconClasses : {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    }),
    TopNavModule,
    SideNavModule,
    NotFoundComponentModule,
    LoadingModule,
    CustomComponentsModule,
    NgxTimelineModule,
    AppRoutingModule
  ],

  providers: [
    CurrencyDisplayPipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faShoppingCart);
  }
}
