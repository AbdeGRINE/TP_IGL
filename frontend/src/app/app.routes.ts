import { Routes } from '@angular/router';
import { MedecinDashboardComponent } from './features/medecin/medecin-dashboard/medecin-dashboard.component';
//import { LoginComponent } from './features/auth/login/login.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { CreerDPIComponent } from './features/admin/creer-dpi/creer-dpi.component';
import { MedecinCreerDpiComponent } from './features/medecin/medecin-creer-dpi/medecin-creer-dpi.component';
import { InfirmierDashboardComponent } from './features/infirmier/infirmier-dashboard/infirmier-dashboard.component';
import { AfficherDpiComponent } from './features/medecin/afficher-dpi/afficher-dpi.component';
import { DashboardPatientComponent } from './features/patient/dashboard-patient/dashboard-patient.component';
import { CreerConsultationComponent } from './features/medecin/creer-consultation/creer-consultation.component';
import { AfficherConsultationComponent } from './features/medecin/afficher-consultation/afficher-consultation.component';
import { LaboratinDashboardComponent } from './features/laboratin/laboratin-dashboard/laboratin-dashboard.component';
import { RadiologueDashboardComponent } from './features/radiologue/radiologue-dashboard/radiologue-dashboard.component';
import { PatientAfficherConsultationComponent } from './features/patient/patient-afficher-consultation/patient-afficher-consultation.component';
import { afficherDpiGuard } from './guards/medecin/afficher-dpi.guard';
import { afficherConsultationGuard } from './guards/medecin/afficher-consultation.guard';
import { creerConsultationGuard } from './guards/medecin/creer-consultation.guard';
import { afficherConsultationPatientGuard } from './guards/patient/afficher-consultation.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //route to login by default.
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'creer-dpi',
    component: CreerDPIComponent,
    title: 'Creer DPI',
  },
  {
    path: 'medecin-dashboard',
    component: MedecinDashboardComponent,
    title: 'Medecin Dashboard',
    children: [
      {
        path: 'afficher-dpi/:id',
        component: AfficherDpiComponent,
        title: 'Afficher DPI',
        canActivate: [afficherDpiGuard],
        children: [
          {
            path: 'afficher-consultation/:id',
            component: AfficherConsultationComponent,
            title: 'Afficher Consultation',
            canActivate: [afficherConsultationGuard]
          },
          {
            path: 'creer-consultation',
            component: CreerConsultationComponent,
            title: 'Creer Consultation',
            canActivate: [creerConsultationGuard],
          },
        ],
      },
      {
        path: 'medecin-creer-dpi',
        component: MedecinCreerDpiComponent,
        title: 'Creer DPI Medecin',
      },
    ],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
  },
  {
    path: 'patient-dashboard',
    component: DashboardPatientComponent,
    title: 'Patient Dashboard',
    children : [
      {
        path : 'patient-afficher-consultation/:id',
        component: PatientAfficherConsultationComponent,
        title : 'Patient Afficher Consultation',
        canActivate: [afficherConsultationPatientGuard],
      }
    ]
  },
  {
    path: 'infirmier-dashboard',
    component: InfirmierDashboardComponent,
    title: 'Infirmier Dashboard',
  },
  {
    path: 'laboratin-dashboard',
    component: LaboratinDashboardComponent,
    title: 'Laboratin Dashboard',
  },
  {
    path: 'dashboard-radiologue',
    component: RadiologueDashboardComponent,
    title: 'Radiologue Dashboard',
  },
  { path: '**', redirectTo: 'login' },
];
