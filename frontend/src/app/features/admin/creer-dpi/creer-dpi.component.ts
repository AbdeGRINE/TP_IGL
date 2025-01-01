import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-creer-dpi',
  imports: [HeaderComponent],
  templateUrl: './creer-dpi.component.html',
  styleUrl: './creer-dpi.component.css',
})
export class CreerDPIComponent {
  constructor(private navigationService: NavigationService) {}
  navigateToAdminDashboard() {
    this.navigationService.navigateTo('/admin-dashboard');
  }
  handleSaveDPI() {
    alert("Saved DPI!");
    this.navigationService.navigateTo('/admin-dashboard');
  }
}
