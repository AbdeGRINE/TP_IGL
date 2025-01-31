import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';
import { NavigationService } from '../../../services/navigation.service';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authResponse: AuthResponse;
  constructor(private authService: AuthService, private navigationService: NavigationService) {
    this.authResponse = this.authService.getAuthResponse();
  }
  logout(){
    this.authService.logout();
    alert("Utilisateur deconnecte!");
    this.navigationService.navigateTo("login");
  }
}
