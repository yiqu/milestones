import { Component, ViewChild, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { AppState } from './shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './shared/redux-stores/auth/auth.actions';
import { VerifiedUser } from './shared/models/user.model';

const LOCAL_STORAGE_USER_KEY: string = "VERIFIED_USER";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  footerTitle: string = "@KQ 2020";
  myUrl: string = "https://yiqu.github.io/";

  @ViewChild("snav")
  sideNav: MatSidenav;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public store: Store<AppState>) {
    // injecting AngularFire will auto initializeApp

    //firebase.initializeApp(environment.firebaseConfig);
    /**
     * Detect if deive is mobile size, then re-run detection change
     */
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    //this.fds.mobileQuery = this.mobileQuery; //ngrx
  }

  ngOnInit() {
    const u = this.getUserFromLocalStorage();
    if (u) {
      this.store.dispatch(AuthActions.authAutoLogin({user: u}))
    }
  }

  onTopNavMenuClick() {
    if (this.sideNav) {
      this.sideNav.toggle();
    }
  }

  onNavClose() {
    if (this.sideNav) {
      this.sideNav.close();
    }
  }

  getUserFromLocalStorage(): VerifiedUser {
    const localStorageUser: any = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
    if (!localStorageUser) {
      return null;
    }
    console.info("LS User Present");
    return localStorageUser;
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
