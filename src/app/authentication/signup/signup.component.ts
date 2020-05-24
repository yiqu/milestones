import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfo, IAuthInfo, VerifiedUser } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ErrorStateMatcher } from '@angular/material/core';
import * as em from '../../shared/error-matchers/error-state.matcher';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-auth-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class AuthSignupComponent implements OnInit, OnDestroy {

  matcher: ErrorStateMatcher = new em.AfterActionsErrorStateMatcher();
  signInTitle: string = "Create your BobaShop Account.";
  avartarImgSrc: string = "assets/images/main/user/signin-avatar-default.png";
  signFg: FormGroup;
  compDest$: Subject<any> = new Subject<any>();
  currentUser: VerifiedUser;

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
    public ngZone: NgZone) {
      let id: string = null;
      let pw: string = null;
      this.as.authErrMsg = null;
      if (!environment.production) {
        id = "t@test.com";
        pw = "123456";
      }

      this.signFg = this.fb.group({
        email: fu.createFormControl(id, false, [Validators.required, Validators.email]),
        password: fu.createFormControl(pw, false, [Validators.required]),
        repassword: fu.createFormControl(pw, false, [Validators.required])
      });
  }

  ngOnInit() {
    this.signFg.valueChanges.subscribe((val) => {
      this.as.authErrMsg = null;
      if (this.passwordFc.value !== this.repasswordFc.value) {
        this.repasswordFc.setErrors({"passwordDoesNotMatch": true});
      } else {
        this.repasswordFc.setErrors(null);
      }
    });

    this.as.signupErrorOccured$.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((val) => {
      switch (val) {
        case "email-already-in-use": {
          this.emailFc.setErrors({"emailExists": true});
          break;
        }
        case "invalid-email": {
          this.emailFc.setErrors({"email": true});
          break;
        }
        case "weak-password": {
          this.passwordFc.setErrors({"weak": true});
          break;
        }
        default: {
          this.emailFc.setErrors(null);
        }
      }
    });
  }

  onSignupClick() {
    const res = this.signFg.value;
    if (res.password !== res.repassword) {
      this.as.authErrMsg = "Password does not match.";
    } else {
      const auth: AuthInfo = new AuthInfo(res.email, res.password, false);
      this.signup(auth);
    }
  }

  signup(a: AuthInfo) {
    this.as.createUser(a);
  }

  ngOnDestroy() {
    this.compDest$.next();
  }

}
