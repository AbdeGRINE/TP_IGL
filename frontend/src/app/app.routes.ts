import { Routes } from '@angular/router';
import { MedecinDashboardComponent } from './features/medecin/medecin-dashboard/medecin-dashboard.component';
<<<<<<< HEAD
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

=======
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { CreerDPIComponent } from './features/admin/creer-dpi/creer-dpi.component';
import { InfirmierDashboardComponent } from './infirmier/infirmier-dashboard/infirmier-dashboard.component';
//import { LaborantinComponent } from './laborantin/laborantin.component';
>>>>>>> 0617c4e0aed6e23b15a9a639ebbdedc34293c981
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //route to login by default.
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
<<<<<<< HEAD
    path: 'creer-dpi',
    component: CreerDPIComponent,
    title: 'Creer DPI',
  },
  {
    path: 'medecin-dashboard',
    component: MedecinDashboardComponent,
    title: 'Medecin Dashboard',
    children : [
      {
        path: 'afficher-dpi/:id',
        component: AfficherDpiComponent,
        title: 'Afficher DPI',
        children : [
          {
            path: 'afficher-consultation/:id',
            component: AfficherConsultationComponent,
            title: 'Afficher Consultation',
          },{
            path: 'medecin-creer-dpi',
            component: MedecinCreerDpiComponent,
            title: 'Creer DPI Medecin',
          }]
        
      },
    ]
=======
    path: 'medecin-dashboard',
    component: MedecinDashboardComponent,
    title: 'Medecin Dashboard',
>>>>>>> 0617c4e0aed6e23b15a9a639ebbdedc34293c981
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
  },
<<<<<<< HEAD
  {
    path: 'dashboard-patient',
    component: DashboardPatientComponent,
    title: 'Patient Dashboard',
  },
  {
    path: 'creer-consultation',
    component: CreerConsultationComponent,
    title: 'Creer Consultation',
  },

  {
=======
 
  
  {
    path: 'creer-dpi',
    component: CreerDPIComponent,
    title: 'Creer DPI',
  },
  {
>>>>>>> 0617c4e0aed6e23b15a9a639ebbdedc34293c981
    path: 'infirmier-dashboard',
    component: InfirmierDashboardComponent,
    title: 'Infirmier Dashboard',
  },
<<<<<<< HEAD
  {
    path: 'laboratin-dashboard',
    component: LaboratinDashboardComponent,
    title: 'Laboratin Dashboard',},
    {
    path : 'dashboard-radiologue',
    component: RadiologueDashboardComponent,
    title: 'Radiologue Dashboard',
  },
=======
>>>>>>> 0617c4e0aed6e23b15a9a639ebbdedc34293c981
];
