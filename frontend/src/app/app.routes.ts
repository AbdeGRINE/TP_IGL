import { Routes } from '@angular/router';
import { MedecinDashboardComponent } from './components/medecin-dashboard/medecin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //route to login by default.
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'medecin-dashboard', component: MedecinDashboardComponent, title:'Medecin Dashboard' },
];
