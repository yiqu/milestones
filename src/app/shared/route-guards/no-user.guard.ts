import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable, combineLatest, Subject, of, from } from 'rxjs';
import { map, take, tap, skip } from 'rxjs/operators';
import { VerifiedUser } from '../models/user.model';
import { AppState } from '../redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthState } from '../redux-stores/auth/auth.models';

@Injectable({
  providedIn: 'root'
})
export class NoVerifiedUserGuard implements CanActivate {
  constructor(public router: Router, public route: ActivatedRoute,
    public store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {

    return this.store.select("appAuth").pipe(
      take(1),
      map((state: AuthState) => {
        if (state.verifiedUser) {
          return true;
        }
        return this.router.createUrlTree(['/', 'auth', 'signin']);;;
      }),
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class NoVerifiedUserChildrenGuard implements CanActivateChild {
  constructor(public router: Router, public route: ActivatedRoute,
    public store: Store<AppState>) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {

    return this.store.select("appAuth").pipe(
      take(1),
      map((state: AuthState) => {
        if (state.verifiedUser) {
          return true;
        }
        return this.router.createUrlTree(['/', 'auth', 'signin']);;;
      }),
    );
  }

}
