import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { VerifiedUser } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/redux-stores/global-store/app.reducer';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from '../../shared/redux-stores/auth/auth.models';

@Component({
  selector: 'app-account-view',
  templateUrl: 'view.component.html',
  styleUrls: ['./view.component.css']
})
export class AccountViewComponent implements OnInit {

  viewSubtext: string = "My account information";
  defaultAvartarImgSrc: string = "assets/banner/milestones-banner.jpg";
  compDest$: Subject<any> = new Subject<any>();
  user: VerifiedUser;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.select("appAuth").pipe(
      takeUntil(this.compDest$)
    )
    .subscribe(
      (state: AuthState) => {
        this.user = state.verifiedUser;
      }
    )
  }
}
