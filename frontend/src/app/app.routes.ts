import { Routes } from '@angular/router';
import { MedecinDashboardComponent } from './features/medecin/dashboard/medecin-dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //route to login by default.
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'medecin-dashboard', component: MedecinDashboardComponent, title:'Medecin Dashboard' },
];
