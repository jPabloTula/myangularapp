import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DeportesComponent } from './components/deportes/deportes.component';
import { PaisesComponent } from './components/paises/paises.component';
import { LigasComponent } from './components/ligas/ligas.component';
import { ClubesComponent } from './components/clubes/clubes.component';

// @Component({ template: '<p>Login Page</p>' }) class LoginComponent {}
// @Component({ template: '<p>Dashboard Page</p>' }) class DashboardComponent {}
// @Component({ template: '<p>Profile Page</p>' }) class ProfileComponent {}
// @Component({ template: '<p>Settings Page</p>' }) class SettingsComponent {}
// @Component({ template: '<p>Deportes Page</p>' }) class DeportesComponent {}
// @Component({ template: '<p>Paises Page</p>' }) class PaisesComponent {}
// @Component({ template: '<p>Ligas Page</p>' }) class LigasComponent {}

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'deportes', component: DeportesComponent, canActivate: [authGuard] },
  { path: 'paises', component: PaisesComponent, canActivate: [authGuard] },
  { path: 'ligas', component: LigasComponent, canActivate: [authGuard] },
  { path: 'clubes', component: ClubesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: '**', redirectTo: '/login' } // Redirect to login for any other unknown routes
];
