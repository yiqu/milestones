import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-shared-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading: boolean = true;
  logoShakeState: boolean = false;

  constructor(public router: Router) {
    // this.router.events.subscribe((event: Event) => {
    //   switch (true) {
    //     case event instanceof NavigationStart: {
    //       this.loading = true;
    //       break;
    //     }

    //     case event instanceof NavigationEnd:
    //     case event instanceof NavigationCancel:
    //     case event instanceof NavigationError: {
    //       this.loading = false;
    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    // });
  }

  ngOnInit() {

  }
}
