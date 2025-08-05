import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component
({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                [(ngModel)]="username"
                name="username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                [(ngModel)]="password"
                name="password"
                required
              />
            </div><button type="submit" class="btn btn-primary">Login</button></form></div></div></div></div></div>`,styleUrls: ['./login.component.css'],changeDetection: ChangeDetectionStrategy.OnPush,})
export class LoginComponent {
  username = signal('');
  password = signal('');

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.login(this.username(), this.password()).subscribe({
      next: (token) => {
        console.log('Login successful, token:', token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        // You might want to display an error message to the user here
      }
    });
  }

}