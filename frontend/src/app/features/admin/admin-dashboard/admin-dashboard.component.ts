import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [HeaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  // this is a good way to navigate,
  //but I will search other ways,
  //or creat a general methode: navigateTo('path')
  //there is no router.back?
  constructor(private router: Router) {}
  navigateToCreerCompte() {
    this.router.navigate(['/creer-compte']);
  }
}
