import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './signup.html',
    styleUrls: ['./signup.css']
})
export class Signup {
    auth = inject(AuthService);
    router = inject(Router);

    username = '';
    email = '';
    password = '';
    isLoading = false;
    errorMessage = '';

    onSubmit() {
        if (!this.username || !this.email || !this.password) return;
        if (!this.email.includes('@')) {
            this.errorMessage = 'Please enter a valid email address.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        this.auth.signup(this.username, this.email, this.password).subscribe({
            next: () => {
                this.auth.login(this.username, this.password).subscribe({
                    next: () => {
                        this.isLoading = false;
                        this.router.navigate(['/dashboard']);
                    },
                    error: (loginErr) => {
                        this.isLoading = false;
                        this.errorMessage = 'Account created, but automatic sign in failed. Please sign in manually.';
                        setTimeout(() => {
                            this.router.navigate(['/signin']);
                        }, 2000);
                    }
                });
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Signup failed. Username or email might be taken.';
            }
        });
    }
}
