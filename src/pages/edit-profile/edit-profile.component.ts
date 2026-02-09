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
   fb = inject(FormBuilder);
   store = inject(Store);
  user$ = this.store.select(selectUser);

  imagePreview: string | null = null;
   

  editProfile = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      age: [null as number | null, [Validators.required, Validators.min(18), Validators.max(99)]],
      gender: ['', [Validators.required]],
      skills: ['', [Validators.maxLength(120)]],
      about: ['', [Validators.maxLength(500)]],
      image: ['', [Validators.pattern(/^https?:\/\/.+/i)]]
    });
  
   
    ngOnInit(): void {
      this.user$
        .pipe(filter((user): user is NonNullable<typeof user> => !!user), take(1))
        .subscribe((user) => {
          this.editProfile.patchValue({
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            image: user.image ?? '',
            age: user.age ?? null,
            gender: user.gender ?? '',
            skills: user.skills ?? '',
            about: user.about ?? ''   
          });
          this.imagePreview = user.image ?? null;
        });
    }

    onImageSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      this.imagePreview = objectUrl;
      this.editProfile.patchValue({ image: objectUrl });
    }
  
    onSubmit(): void {
      if (this.editProfile.invalid) {
        this.editProfile.markAllAsTouched();
        return;
      }
      const payload = this.editProfile.value;
      // TODO: wire to service when available
      // console.log('Profile payload', payload);
    }
  }
  



