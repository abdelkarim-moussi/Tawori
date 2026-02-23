import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserApiService } from '../../../core/services/user-api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../../core/types/user';
import { hashPassword } from '../../../core/utils/hash.util';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isSubmitting = false;
  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    })
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.http.get<User[]>(`${environment.jsonServerUrl}/users`, {
      params: { email }
    }).subscribe({
      next: async (users) => {
        const hashedPassword = await hashPassword(password);
        if (users.length > 0 && users[0].password === hashedPassword) {
          localStorage.setItem('user', JSON.stringify({
            'id': String(users[0].id),
            'email': users[0].email
          }));
          this.toastr.success('Welcome back!');
          this.router.navigate(['/offers']);
        } else {
          this.errorMessage = 'Invalid email or password';
          this.toastr.error('Invalid email or password');
          this.isSubmitting = false;
        }
      },
      error: () => {
        this.errorMessage = 'Login failed. Please try again.';
        this.toastr.error('Login failed. Please try again.');
        this.isSubmitting = false;
      }
    });
  }
}
