import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const authGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.currentUser() || auth.getToken()) {
        return true;
    }
    router.navigate(['/signin']);
    return false;
};

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'signin',
        loadComponent: () => import('./pages/signin/signin').then(m => m.Signin)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup').then(m => m.Signup)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [authGuard]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
