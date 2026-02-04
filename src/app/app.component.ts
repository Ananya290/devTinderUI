import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'devTinder-WEB';
  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (user) => {
        if (user) {
          this.store.dispatch(loginSuccess({ user }));
        } else if (!user) {
          this.router.navigate(['/auth']);
        }
      },
      error: () => {
        this.router.navigate(['/auth']);
      },
    });
  }
}

/*
 src/
 └── app/
     ├── core/                  # services, guards, interceptors
     ├── shared/                # reusable UI components
     ├── layout/                # app layout components
     │   ├── header/
     │   │   ├── header.component.ts
     │   │   ├── header.component.html
     │   │   ├── header.component.scss
     │   │   └── header.component.spec.ts
     │   ├── footer/
     │   └── sidebar/
     │
     ├── pages/                 # route-level pages
     │   ├── home/
     │   ├── login/
     │   └── profile/
     │
     ├── app.component.ts       # standalone root component
     ├── app.rout
     ├── store/              ⭐ (NEW – global state)
 │     └── auth/
 │         ├── auth.actions.ts
 │         ├── auth.reducer.ts
 │         ├── auth.selectors.ts
 │         ├── auth.effects.ts
 │         └── auth.state.ts
     utils
           constants
*/
