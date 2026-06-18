import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <header class="app-header">
      <div class="logo-container" routerLink="/home" style="cursor: pointer;">
        <span class="logo-icon">🚀</span>
        <span class="logo-text">Taskly</span>
      </div>
      <nav class="nav-links">
        <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
        <a *ngIf="!auth.currentUser()" routerLink="/signup" routerLinkActive="active">Sign Up</a>
        <a *ngIf="!auth.currentUser()" routerLink="/signin" routerLinkActive="active">Sign In</a>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      </nav>
      <div class="auth-section" *ngIf="auth.currentUser()">
        <span class="welcome-user">👋 {{ auth.currentUser()?.username }}</span>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </div>
    </header>
    <main class="app-main">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: #f8fafc;
      min-height: 100vh;
    }

    .app-header {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 40px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      font-size: 1.5rem;
    }

    .logo-text {
      font-size: 1.3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      gap: 20px;
    }

    .nav-links a {
      text-decoration: none;
      color: #64748b;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      padding: 8px 16px;
      border-radius: 10px;
    }

    .nav-links a:hover {
      color: #4f46e5;
      background: #f1f5f9;
    }

    .nav-links a.active {
      color: #4f46e5;
      background: #eeebff;
    }

    .auth-section {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .welcome-user {
      font-size: 0.9rem;
      font-weight: 600;
      color: #334155;
    }

    .logout-btn {
      padding: 8px 16px;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .logout-btn:hover {
      background: #fee2e2;
      color: #ef4444;
      border-color: #fca5a5;
    }

    .app-main {
      min-height: calc(100vh - 70px);
    }

    @media (max-width: 768px) {
      .app-header {
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
      }
    }
  `]
})
export class App implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.auth.loadUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/signin']);
  }
}
