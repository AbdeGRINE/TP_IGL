import { Routes } from '@angular/router';
import { MedecinDashboardComponent } from './features/medecin/medecin-dashboard/medecin-dashboard.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { CreerCompteComponent } from './features/admin/creer-compte/creer-compte.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //route to login by default.
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'medecin-dashboard', component: MedecinDashboardComponent, title:'Medecin Dashboard' },
  { path: 'admin-dashboard', component: AdminDashboardComponent, title:'Admin Dashboard' },
  {path: 'creer-compte', component: CreerCompteComponent, title: 'Creer Compte'},

];
