import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfoFromUser, IAuthInfo, VerifiedUser } from '../../shared/models/user.model';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ErrorStateMatcher } from '@angular/material/core';
import * as em from '../../shared/error-matchers/error-state.matcher';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { AuthState } from '../../shared/redux-stores/auth/auth.models';


@Component({
  selector: 'app-auth-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class AuthSignupComponent implements OnInit, OnDestroy {

  matcher: ErrorStateMatcher = new em.AfterActionsErrorStateMatcher();
  signInTitle: string = "Create your Milestone Account.";
  avartarImgSrc: string = "assets/banner/milestones-banner-4.png";
  signFg: FormGroup;
  compDest$: Subject<any> = new Subject<any>();
  errorMsg: string;
  errorOccured: boolean;
  loading: boolean;


  get emailFc(): FormControl {
    return <FormControl>this.signFg.get("email");
  }

  get passwordFc(): FormControl {
    return <FormControl>this.signFg.get("password");
  }

  get repasswordFc(): FormControl {
    return <FormControl>this.signFg.get("repassword");
  }

  constructor(public fb: FormBuilder, public as: AuthService, public router: Router,
    private store: Store<AppState>) {

      let id: string = null;
      let pw: string = null;

      if (!environment.production) {
        id = "t@test.com";
        pw = "123456";
      }

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

      this.signFg = this.fb.group({
        email: fu.createFormControl(id, false, [Validators.required, Validators.email]),
        password: fu.createFormControl(pw, false, [Validators.required]),
        repassword: fu.createFormControl(pw, false, [Validators.required])
      });
  }

  ngOnInit() {
    this.as.clearErrors();

    this.signFg.valueChanges.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((val) => {
      this.as.clearErrors();
      if (this.passwordFc.value !== this.repasswordFc.value) {
        this.repasswordFc.setErrors({"passwordDoesNotMatch": true});
      } else {
        this.repasswordFc.setErrors(null);
      }
    });
  }

  onSignupClick() {
    const res = this.signFg.value;
    if (res.password !== res.repassword) {
      this.as.throwErrorMessage("Password does not match.")
    } else {
      const auth: AuthInfoFromUser = new AuthInfoFromUser(res.email, res.password, true);
      this.signup(auth);
    }
  }

  signup(a: AuthInfoFromUser) {
    this.as.registerUser(a);
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
