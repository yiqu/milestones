import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as RouterActions from './router-related.actions';
import { tap } from 'rxjs/operators';


@Injectable()
export class RouterEffects {

  constructor(public router: Router, public route: ActivatedRoute,
    public actions$: Actions) {
  }


  routerRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouterActions.redirectWithUrl),
      tap((urlToGo) => {
        const urlToRedirect: string[] = urlToGo.url;
        if (urlToRedirect && urlToRedirect.length > 0) {
          this.router.navigate(urlToRedirect);
        }
      }));
  }, {dispatch: false});


}
