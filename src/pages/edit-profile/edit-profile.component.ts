import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  private store = inject(Store);

  editProfileForm = inject(FormBuilder).group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', [Validators.required, Validators.min(0)]],
    gender: ['', Validators.required],
    skills: ['', Validators.required],
    image: ['']
  });
  isEditing = false;
  // isViewing = true;
  userProfile: any;

  ngOnInit(): void {
 this.editProfileForm.disable();
  if(this.isEditing == false){
     this.store.select(selectUser).subscribe(user => {
  if (!user) return;

  this.userProfile = {
    ...user,
    skills: Array.isArray(user.skills)
      ? user.skills
      : user.skills?.split(',')
  };
});
  }
  }
  enableEdit() {
  this.isEditing = true;

  this.editProfileForm.enable(); // form enable karo

  this.store.select(selectUser).pipe(
    filter(user => !!user),
    take(1)
  ).subscribe(user => {
    this.editProfileForm.patchValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      age: user?.age?.toString(),
      gender: user?.gender,
      skills: user?.skills
    });
  });
}
  onSubmit(){
    if (this.editProfileForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  }
  cancelEdit() {
  this.isEditing = false;
  this.editProfileForm.reset(); 
}
   
  }
  



