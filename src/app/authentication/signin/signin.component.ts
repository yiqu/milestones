import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfoFromUser, IAuthInfo } from '../../shared/models/user.model';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { AuthState } from '../../shared/redux-stores/auth/auth.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class AuthSigninComponent implements OnInit, OnDestroy {

  signInTitle: string = "Sign in with your Milestones Account";
  avartarImgSrc: string = "assets/banner/milestones-banner-4.png";
  signFg: FormGroup;
  compDest$: Subject<any> = new Subject<any>();
  errorMsg: string;
  errorOccured: boolean;
  loading: boolean;

  get idFc(): FormControl {
    return <FormControl>this.signFg.get("id");
  }

  get passwordFc(): FormControl {
    return <FormControl>this.signFg.get("password");
  }

  constructor(public fb: FormBuilder, public as: AuthService, public router: Router,
    private store: Store<AppState>) {

    let id: string = null;
    let pw: string = null;

    this.store.select("appAuth").pipe(
      takeUntil(
        this.compDest$
      )
    ).subscribe(
      (authState: AuthState) => {
        this.errorMsg = authState.errorMsg;
        this.errorOccured = authState.error;
        this.loading = authState.loading;
        this.disableFieldsOnLoading(authState.loading);
      }
    );

    if (!environment.production) {
      id = "t1@test.com";
      pw = "123456";
    }
    this.signFg = this.fb.group({
      id: fu.createFormControl(id, false, [Validators.required, Validators.email]),
      password: fu.createFormControl(pw, false),
      saveSession: fu.createFormControl(true, false)
    });
  }

  ngOnInit() {
    this.as.clearErrors();
    this.signFg.valueChanges.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((val) => {
      this.as.clearErrors();
    });
  }

  onSignInClick() {
    if (this.passwordFc.value && this.passwordFc.value.trim()!=="") {
      const auth: AuthInfoFromUser = new AuthInfoFromUser(this.signFg.value.id, this.signFg.value.password,
        this.signFg.value.saveSession);
      this.signIn(auth);
    } else {
      this.as.throwErrorMessage("Enter a password.")
    }
  }

  signIn(a: AuthInfoFromUser) {
    this.as.userLogin(a);
  }

  disableFieldsOnLoading(loading: boolean) {
    if (this.signFg) {
      loading ? this.signFg.disable({onlySelf: true, emitEvent: false}) :
        this.signFg.enable({onlySelf: true, emitEvent: false});
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }


}
