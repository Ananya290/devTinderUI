import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { loginFailure, loginSuccess } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { User } from '../../store/auth.model';
import { Router } from '@angular/router';
import * as AuthActions from '../../store/auth/auth.actions';


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
  signUpForm!:FormGroup
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  showError = false;
  isLoginMode = true; 
    private store = inject(Store);
    private router = inject(Router);

     loading$ = this.store.select(state => state.auth.loading);
    error$ = this.store.select(state => state.auth.error);

  ngOnInit(): void {
    this.authForm = this.fb.group({
      emailId:['', [  Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password:['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      emailId: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      skills: ['', Validators.required],
      about: ['', Validators.required]
    });
  }

  setMode(loginMode: boolean) {
    this.isLoginMode = loginMode;
    this.showError = false;
    if (loginMode) {
      this.signUpForm.reset();
    } else {
      this.authForm.reset();
    }
  }


   
  

OnLogin() {
    if (this.authForm.invalid) return;

    this.store.dispatch(
      AuthActions.login(
        this.authForm.value as {
          emailId: string;
          password: string;
        }
      )
    );
  }
onSignUp() {
  if (this.signUpForm.invalid)
     return;
    this.store.dispatch(AuthActions.signUp(this.signUpForm.value as {
      firstName: string;
      lastName: string;
      emailId: string;
      password: string;
      age: number;
      gender: string;
      image: File;
      skills: string;
      about: string;
    }));
    console.log("Sign Up Form Value:", this.signUpForm.value);

}

  }
