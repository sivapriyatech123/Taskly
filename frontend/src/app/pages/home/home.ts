import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class Home {
    auth = inject(AuthService);
    router = inject(Router);

    getStarted() {
        if (this.auth.currentUser()) {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/signin']);
        }
    }
}
