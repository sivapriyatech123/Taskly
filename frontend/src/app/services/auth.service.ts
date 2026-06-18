import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'https://taskly-backend-q6a4.onrender.com/api/auth';

    currentUser = signal<{ username: string } | null>(null);

    constructor() {
        this.loadUser();
    }

    signup(username: string, email: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, { username, email, password });
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
            tap((res: any) => {
                this.currentUser.set({ username: res.username });
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify({ username: res.username }));
            })
        );
    }

    logout() {
        this.currentUser.set(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    loadUser() {
        const token = this.getToken();
        const user = localStorage.getItem('user');
        if (token && user) {
            try {
                this.currentUser.set(JSON.parse(user));
            } catch (e) {
                this.logout();
            }
        } else {
            this.logout();
        }
    }
}
