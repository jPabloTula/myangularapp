import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private readonly TOKEN_KEY = 'jwt_token';

  constructor() { }

  /**
   * Simulates a login request.
   * @param username The username.
   * @param password The password.
   * @returns An Observable that emits a mock JWT token on success, or an error on failure.
   */
  login(username: string, password: string): Observable<string> {
    if (username === 'user' && password === 'password') {
      // Simulate a successful login and return a mock JWT token
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
 this.saveToken(mockToken);
      return of(mockToken);
    } else {
      // Simulate a failed login
      return throwError(() => new Error('Invalid username or password'));
    }
  }

  /**
   * Saves the JWT token to localStorage.
   * @param token The JWT token to save.
   */
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Retrieves the JWT token from localStorage.
   * @returns The JWT token, or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Logs out the user by removing the token from localStorage and navigating to the login page.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is authenticated by checking for the presence of a token.
   * A more robust implementation would validate the token (e.g., against an expiry).
   * @returns True if a token exists, false otherwise.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}