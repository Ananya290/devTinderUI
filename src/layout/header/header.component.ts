import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { Router, RouterLink } from "@angular/router";
import { selectUser } from '../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import * as AuthActions from '../../store/auth/auth.actions';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, OverlayModule, RouterLink,AsyncPipe,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   isLoggedIn = true;
  private store = inject(Store);
  user$ = this.store.select(selectUser);
  private router =inject(Router)
  logout() {
    this.store.dispatch(AuthActions.logout());
  }


}
