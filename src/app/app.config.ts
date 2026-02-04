import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(), provideStore({
       auth: authReducer
    }
    ), provideEffects(AuthEffects), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
