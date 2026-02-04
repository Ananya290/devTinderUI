// auth.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    actions$ = inject(Actions);
    authService = inject(AuthService);
     router = inject(Router);

login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap(({ emailId, password }) =>
      this.authService.onLoginSubmit({ emailId, password }).pipe(
        map(user => AuthActions.loginSuccess({ user })),
        catchError(err =>
          of(
            AuthActions.loginFailure({
              error: err?.error?.message || 'Invalid credentials'
            })
          )
        )
      )
    )
  )
);


  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logoutSuccess),
    mergeMap(() =>
      this.authService.logout().pipe(
        map(() => AuthActions.logoutSuccess())
      )
    )
  )
);

}
