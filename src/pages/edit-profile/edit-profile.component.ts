import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { selectUser } from '../../store/auth/auth.selectors';
import { setUser } from '../../store/auth/auth.actions';
import { UserfeedService } from '../../services/user/userfeed.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  private store = inject(Store);
 private UserfeedService = inject(UserfeedService);

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
  console.log(this.userProfile)
  this.editProfileForm.disable();
  this.getUserProfile();
 
  }
  getUserProfile() {
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
      console.log(this.userProfile._id)


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
      skills: user?.skills,
      image: user?.image  
      
    });
  });
}
  onSubmit(){
    console.log(this.editProfileForm.value);
    console.log(this.userProfile)
    if (this.editProfileForm.valid) {
      const formValue = this.editProfileForm.value;
      const payload = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        age: Number(formValue.age),
        gender: formValue.gender,
        skills: typeof formValue.skills === 'string'
        ? formValue.skills.split(',').map((s: string) => s.trim())
        : formValue.skills,
        image: formValue?.image 
      };
    console.log("Payload:", payload); 

      this.UserfeedService.onEditProfileService(payload).subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
          // Update the store with the new user data
          this.store.dispatch(setUser({ user: response }));
          this.editProfileForm.reset();
          this.isEditing = false;
        },
        error: (err) => {
          console.error('Failed to update profile', err);
        }
      });

    }
  }
  cancelEdit() {
  this.isEditing = false;
  this.editProfileForm.reset(); 
}
   
  }
  



