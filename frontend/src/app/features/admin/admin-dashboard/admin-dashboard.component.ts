import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [HeaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private navigationService: NavigationService) {}
  navigateToCreerDPI() {
    this.navigationService.navigateTo('/creer-dpi');
  }
}
