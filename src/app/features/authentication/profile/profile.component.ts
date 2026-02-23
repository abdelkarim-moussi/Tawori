import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserApiService } from '../../../core/services/user-api.service';
import { User } from '../../../core/types/user';
import { ToastrService } from 'ngx-toastr';
import { hashPassword } from '../../../core/utils/hash.util';

@Component({
    selector: 'app-profile',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

    isLoading = true;
    isSaving = false;
    isDeleting = false;
    showDeleteConfirm = false;
    userId!: number;

    profileForm = new FormGroup({
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
        newPassword: new FormControl('', {
            validators: [Validators.minLength(8)],
            nonNullable: true,
        })
    });

    constructor(
        private userService: UserApiService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        const stored = localStorage.getItem('user');
        if (!stored) {
            this.router.navigate(['/login']);
            return;
        }

        const parsed = JSON.parse(stored);
        this.userId = Number(parsed.id);

        this.userService.getUserById(this.userId).subscribe({
            next: (user) => {
                this.profileForm.patchValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                });
                this.isLoading = false;
            },
            error: () => {
                this.toastr.error('Failed to load profile');
                this.isLoading = false;
            }
        });
    }

    async onSave(): Promise<void> {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        this.isSaving = true;

        const newPassword = this.profileForm.value.newPassword;
        let password = '';

        if (newPassword && newPassword.length >= 8) {
            password = await hashPassword(newPassword);
        }

        const updatedUser: Partial<User> = {
            firstName: this.profileForm.value.firstName!,
            lastName: this.profileForm.value.lastName!,
            email: this.profileForm.value.email!,
        };

        if (password) {
            updatedUser.password = password;
        }

        this.userService.updateUser(this.userId, updatedUser as User).subscribe({
            next: (user) => {
                localStorage.setItem('user', JSON.stringify({
                    'id': String(user.id),
                    'email': user.email
                }));
                this.toastr.success('Profile updated successfully!');
                this.isSaving = false;
                this.profileForm.get('newPassword')?.reset();
            },
            error: () => {
                this.toastr.error('Failed to update profile');
                this.isSaving = false;
            }
        });
    }

    onDelete(): void {
        this.isDeleting = true;

        this.userService.deleteUser(this.userId).subscribe({
            next: () => {
                localStorage.removeItem('user');
                this.toastr.success('Account deleted');
                this.router.navigate(['/register']);
            },
            error: () => {
                this.toastr.error('Failed to delete account');
                this.isDeleting = false;
                this.showDeleteConfirm = false;
            }
        });
    }
}
