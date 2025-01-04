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
      token: '4ca14a05b91bfb2690e4b80b962aba98625442ec',
      user: {
        id: 3,
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
    // this.authService.login(this.username, this.password).subscribe({
    //   next: (response) => {
    //     //set the info of user:
    //     this.authService.setAuthResponse(response);
    //     if (this.isBrowser) {
    //       localStorage.setItem('token', response.token);
    //       if (response.user.type.type === 'admin') {
    //         this.naviagtionService.navigateTo('/admin-dashboard');
    //       } else if (response.user.type.type === 'medecin') {
    //         this.naviagtionService.navigateTo('/medecin-dashboard');
    //       } else if (response.user.type.type === 'patient') {
    //         this.naviagtionService.navigateTo('/patient-dashboard');
    //       } else if (response.user.type.type === 'infirmier') {
    //         this.naviagtionService.navigateTo('/infirmier-dashboard');
    //       } else if (response.user.type.type === 'laboratin') {
    //         this.naviagtionService.navigateTo('/laboratin-dashboard');
    //       } else if (response.user.type.type === 'radiologue') {
    //         this.naviagtionService.navigateTo('/dashboard-radiologue');
    //       } else {
    //         console.error('Unknown user type:', response.user.type);
    //       }
    //       console.log(response);
    //     }
    //   },
    //   error: (error) => {
    //     this.error = error.error.error || 'Login failed';
    //   },
    // });
  }
}
