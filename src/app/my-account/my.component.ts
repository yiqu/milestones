import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AppState } from '../shared/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { VerifiedUser } from '../shared/models/user.model';
import { AuthState } from '../shared/redux-stores/auth/auth.models';
import { takeUntil } from 'rxjs/operators';
import { NavItem } from '../shared/models/nav-item.model';

@Component({
  selector: 'app-my-account',
  templateUrl: 'my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  user: VerifiedUser;
  tabLinks: NavItem[] = [];
  activeLink: NavItem;


  constructor() {
    this.tabLinks.push(
      new NavItem("view", "Overview", "view", false, 'account_circle'),
      new NavItem("edit", "Update", "edit", false, 'edit'),
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
