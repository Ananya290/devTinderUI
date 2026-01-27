import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'devTinder-WEB';
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
*/