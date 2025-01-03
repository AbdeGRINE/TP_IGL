import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavigationService } from '../../../services/navigation.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  private isBrowser: boolean;
  private authResponse : AuthResponse = {
      token: 'd99d0eb010bac9acc6e935d9dc00845b5995e285',
      user: {
        id: '8',
        username: 'messaoud',
        password: 'amalamal',
        email: 'ma_messaoud@esi.dz',
        type: {
          type : 'medecin',
          id : '1',
        }
      },
    };

  constructor(
    private naviagtionService: NavigationService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onSubmit(): void {
    // 
    setTimeout(() => {
      this.authService.setAuthResponse(this.authResponse);
      if (this.isBrowser) {
        localStorage.setItem('authResponse', JSON.stringify(this.authResponse));
        if (this.authResponse.user.type.type === 'admin') {
          this.naviagtionService.navigateTo('/admin-dashboard');
        } else if (this.authResponse.user.type.type === 'medecin') {
          this.naviagtionService.navigateTo('/medecin-dashboard');
        } else if (this.authResponse.user.type.type === 'patient') {
          this.naviagtionService.navigateTo('/patient-dashboard');
        } else if (this.authResponse.user.type.type === 'infirmier') {
          this.naviagtionService.navigateTo('/infirmier-dashboard');
        } else if (this.authResponse.user.type.type === 'laboratin') {
          this.naviagtionService.navigateTo('/laboratin-dashboard');
        } else if (this.authResponse.user.type.type === 'radiologue') {
          this.naviagtionService.navigateTo('/radiologue-dashboard');
        } else {
          console.error('Unknown user type:', this.authResponse.user.type.type);
        }
        console.log(this.authResponse);
      }
    }, 500);
  }
}
