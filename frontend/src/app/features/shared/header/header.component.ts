import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authResponse: AuthResponse;
  constructor(private authService: AuthService) {
    this.authResponse = this.authService.getAuthResponse();
  }
}
