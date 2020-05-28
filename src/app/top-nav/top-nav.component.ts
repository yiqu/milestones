import { Component, OnInit, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { headShakeAnimation, rotateAnimation, tadaAnimation } from 'angular-animations';
import { MenuItem } from '../shared/models/nav-item.model';
import { AuthService } from '../services/auth.service';
import { AppState } from '../shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthState } from '../shared/redux-stores/auth/auth.models';
import { VerifiedUser } from '../shared/models/user.model';
import * as utils from '../shared/utils/general.utils';
import { CapitalizeFirstLetterPipe } from '../shared/pipes/letters.pipe';

@Component({
  selector: 'app-top-nav',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  animations: [
    headShakeAnimation(),
    rotateAnimation(),
    tadaAnimation()
  ]
})
export class TopNavComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string = "Milestones";
  compDest$: Subject<any> = new Subject<any>();
  logoShakeState: boolean = false;
  leftNavMenuState: boolean = false;
  swingState: boolean = false;
  userMenuIcon: string; //account_circle
  userMenuItems: MenuItem[] = [];
  loading: boolean;

  @Output()
  navToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router, public route: ActivatedRoute,
    public as: AuthService, private store: Store<AppState>,
    private capitalize: CapitalizeFirstLetterPipe) {
      this.store.select("appAuth").subscribe(
        (state: AuthState) => {
          this.loading = state.loading;
          this.buildUserMenuItems(state.verifiedUser);
          this.userMenuIcon = state.verifiedUser ? "account_circle" : "perm_identity";
        }
      )

  }

  ngOnInit() {
    this.animateLogoOnStart();

  }

  ngAfterViewInit() {
  }

  onLogoClick() {
    this.logoShakeState = !this.logoShakeState;
  }

  onMenuClick() {
    this.leftNavMenuState = !this.leftNavMenuState;
    this.navToggle.emit(true);
  }

  animateLogoOnStart() {
    const logoAnimateTimer = timer(600);
    logoAnimateTimer.pipe(
      take(1)
    ).subscribe((val) => {
      this.swingState = true;
    })
  }

  onAuthClick() {
    this.router.navigate(['auth']);
  }

  onMenuItemClick(item: MenuItem) {
    if (item.id === "account") {
      this.router.navigate(['/', 'my-account']);
    } else if (item.id === "signout") {
      this.onSignoutClick();
    } else if (item.id === "signin") {
      this.onAuthClick();
    }
  }

  onSignoutClick() {
    this.as.signoutUser();
  }


  buildUserMenuItems(u: VerifiedUser) {
    this.userMenuItems = [];
    if (u) {
      const displayName = utils.createInitAlias(u.email);
      this.userMenuItems.push(
        new MenuItem(null, this.capitalize.transform(displayName), null,
          true),
        new MenuItem("account_circle", "My profile", "account"),
        new MenuItem("forward", "Sign Out", "signout")
      )
    } else {
      this.userMenuItems.push(
        new MenuItem("record_voice_over", "Sign in", "signin"),
      )
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
