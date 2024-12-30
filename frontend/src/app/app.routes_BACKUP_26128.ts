import { Routes } from '@angular/router';
import { MedecinDashboardComponent } from './features/medecin/medecin-dashboard/medecin-dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { CreerDPIComponent } from './features/admin/creer-dpi/creer-dpi.component';
<<<<<<< HEAD
import { InfirmierDashboardComponent } from './infirmier/infirmier-dashboard/infirmier-dashboard.component';
=======
import { AfficherDpiComponent } from './features/medecin/afficher-dpi/afficher-dpi.component';
import { DashboardPatientComponent } from './features/patient/dashboard-patient/dashboard-patient.component';
import { CreerConsultationComponent } from './features/medecin/creer-consultation/creer-consultation.component';
import { AfficherConsultationComponent } from './features/medecin/afficher-consultation/afficher-consultation.component';
>>>>>>> origin/amal/medecin

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
<<<<<<< HEAD
    path: 'infirmier-dashboard',
    component: InfirmierDashboardComponent,
    title: 'Infirmier Dashboard',
=======
    path: 'afficher-dpi',
    component: AfficherDpiComponent,
    title: 'Afficher DPI',
  },
  {
    path : 'dashboard-patient',
    component: DashboardPatientComponent,
    title: 'Patient Dashboard',
  },
  {
    path: 'creer-consultation',
    component: CreerConsultationComponent,
    title: 'Creer Consultation',
  },
  {
    path: 'afficher-consultation',
    component: AfficherConsultationComponent,
    title: 'Afficher Consultation',
>>>>>>> origin/amal/medecin
  },
];
