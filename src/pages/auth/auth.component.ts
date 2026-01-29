import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

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
  ngOnInit(): void {
    this.authForm = this.fb.group({
      emailId:['', [  Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password:['', [ Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    })
    }

OnLogin(data:any){
    console.log(this.authForm.value);
    this.authService.onLoginSubmit(data).subscribe(response =>{
      console.log(response);
    });
}

  }
