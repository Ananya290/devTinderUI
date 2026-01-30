import { Component, inject, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterLink } from "@angular/router";
import { selectUser } from '../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, OverlayModule, RouterLink,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {

      
  }
   isLoggedIn = true;
  userName = 'Ananya';
  private store = inject(Store);
  user$ = this.store.select(selectUser);



  logout() {
    console.log('Logout clicked');
  }


}
