import { Component, OnInit, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { headShakeAnimation, rotateAnimation, tadaAnimation } from 'angular-animations';
import { MenuItem } from '../shared/models/nav-item.model';
import { AuthService } from '../services/auth.service';

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

  @Output()
  navToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router, public route: ActivatedRoute,
    public as: AuthService) {
    this.buildUserMenuItems();
  }

  ngOnInit() {
    this.animateLogoOnStart();
    this.userMenuIcon = "perm_identity";
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
    this.as.signoutUser().then(
      (res) => {
        this.router.navigate(['/']);
      },
      (rej) => {

      }
    );
  }


  buildUserMenuItems() {
    this.userMenuItems = [];
    this.userMenuItems.push(
      new MenuItem("record_voice_over", "Sign in", "signin")
    )
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
