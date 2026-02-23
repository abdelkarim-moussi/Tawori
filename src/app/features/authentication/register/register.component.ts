import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserApiService } from '../../../core/services/user-api.service';
import { User } from '../../../core/types/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isSubmitting = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    })
  });

  constructor(
    private userService: UserApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const user: User = {
      id: 0,
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };

    this.userService.addUser(user).subscribe({
      next: (registeredUser) => {
        localStorage.setItem('user', JSON.stringify({
          'id': String(registeredUser.id),
          'email': registeredUser.email
        }));
        this.toastr.success('Account created successfully!');
        this.router.navigate(['/offers']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.toastr.error('Registration failed. Please try again.');
        this.isSubmitting = false;
      }
    });
  }
}
