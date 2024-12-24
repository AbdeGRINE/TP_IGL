import { Routes } from '@angular/router';
import { MedecinDashboardComponent } from './features/medecin/medecin-dashboard/medecin-dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { CreerDPIComponent } from './features/admin/creer-dpi/creer-dpi.component';
import { AfficherDpiComponent } from './features/medecin/afficher-dpi/afficher-dpi.component';
import { DashboardPatientComponent } from './features/patient/dashboard-patient/dashboard-patient.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //route to login by default.
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'medecin-dashboard',
    component: MedecinDashboardComponent,
    title: 'Medecin Dashboard',
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
  },
  {
    path: 'creer-dpi',
    component: CreerDPIComponent,
    title: 'Creer DPI',
  },
  {
    path: 'afficher-dpi',
    component: AfficherDpiComponent,
    title: 'Afficher DPI',
  },
  {
    path : 'dashboard-patient',
    component: DashboardPatientComponent,
    title: 'Patient Dashboard',
  }
];
