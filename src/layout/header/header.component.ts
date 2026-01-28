import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, OverlayModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {

      
  }
   isLoggedIn = true;
  userName = 'Ananya';

  logout() {
    console.log('Logout clicked');
  }


}
