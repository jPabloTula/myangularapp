import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar', // Use a consistent prefix like 'app-'
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">FC MANEU</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">FIXTURES <span class="nav-subtitle">SEASON 1</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/profile" routerLinkActive="active">SQUAD <span class="nav-subtitle">YEAR 2022</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/settings" routerLinkActive="active">MANAGER <span class="nav-subtitle">MR. G</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/deportes" routerLinkActive="active">PLAYERS <span class="nav-subtitle">CAMPAIGN</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/paises" routerLinkActive="active">CONTACT <span class="nav-subtitle">OFFICE</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/clubes" routerLinkActive="active">CLUBS <span class="nav-subtitle">2022</span></a>
            </li>
          </ul>
          <button class="btn btn-outline-light" (click)="logout()">Logout</button>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
    .navbar {
      background-color: #003366;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      padding: 0;
    }
    
    .navbar-brand {
      font-weight: bold;
      font-size: 24px;
      padding: 15px;
      letter-spacing: 1px;
    }
    
    .nav-item {
      border-left: 1px solid rgba(255,255,255,0.1);
    }
    
    .nav-link {
      display: flex;
      flex-direction: column;
      padding: 15px 20px;
      text-align: center;
      transition: background-color 0.3s;
    }
    
    .nav-link:hover {
      background-color: rgba(255,255,255,0.1);
    }
    
    .nav-link.active {
      background-color: rgba(255,255,255,0.2);
    }
    
    .nav-subtitle {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 5px;
      display: block;
    }
    
    @media (max-width: 992px) {
      .nav-item {
        border-left: none;
        border-top: 1px solid rgba(255,255,255,0.1);
      }
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout();
  }

}