import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './signin.html',
    styleUrls: ['./signin.css']
})
export class Signin {
    auth = inject(AuthService);
    router = inject(Router);

    username = '';
    password = '';
    isLoading = false;
    errorMessage = '';

    onSubmit() {
        if (!this.username || !this.password) return;

        this.isLoading = true;
        this.errorMessage = '';

        this.auth.login(this.username, this.password).subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Invalid Credentials';
            }
        });
    }
}
