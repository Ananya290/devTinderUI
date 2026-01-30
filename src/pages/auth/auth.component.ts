import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { loginSuccess } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { User } from '../../store/auth.model';

interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
 
  authForm!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  showError = false;
    private store = inject(Store);

  ngOnInit(): void {
    this.authForm = this.fb.group({
      emailId:['', [  Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password:['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    })
    }

OnLogin(data:any){
    console.log(this.authForm.value);
    this.authService.onLoginSubmit(data).subscribe((res: User) =>{
      console.log(res);
      this.store.dispatch(loginSuccess({
    user: {
      id: res.id,
      firstName: res.firstName,
      lastName: res.lastName,
      emailId: data.emailId,
      image: '',
      token: '',
      timestamps: ''
    }
  }));
    });
}

  }
