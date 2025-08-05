import { Component, ChangeDetectionStrategy, signal, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)" novalidate>
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                [(ngModel)]="username"
                name="username"
                #usernameInput="ngModel"
                required
                [class.is-invalid]="usernameInput.invalid && (usernameInput.dirty || usernameInput.touched || formSubmitted())"
              />
              <div class="invalid-feedback">
                @if (usernameInput.invalid && (usernameInput.dirty || usernameInput.touched || formSubmitted())) {
                  @if (usernameInput.errors?.['required']) {
                    El nombre de usuario es requerido
                  }
                }
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                [(ngModel)]="password"
                name="password"
                #passwordInput="ngModel"
                required
                [class.is-invalid]="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched || formSubmitted())"
              />
              <div class="invalid-feedback">
                @if (passwordInput.invalid && (passwordInput.dirty || passwordInput.touched || formSubmitted())) {
                  @if (passwordInput.errors?.['required']) {
                    La contraseña es requerida
                  }
                }
              </div>
            </div>
            <div class="mb-3">
               @if (loginError()) {
                 <div class="alert alert-danger">
                   {{ loginError() }}
                 </div>
               }
             </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>`,
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  username = model('');
  password = model('');
  loginError = signal('');
  formSubmitted = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(form: NgForm) {
    this.formSubmitted.set(true);
    this.loginError.set('');
    
    if (form.invalid) {
      return;
    }
    
    this.authService.login(this.username(), this.password()).subscribe({
      next: (token) => {
        console.log('Login successful, token:', token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError.set('Usuario o contraseña incorrectos. Por favor intente de nuevo.');
      }
    });
  }

}