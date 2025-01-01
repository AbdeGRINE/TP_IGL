import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavigationService } from '../../../services/navigation.service';

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

  constructor(
    private naviagtionService: NavigationService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        //set the info of user:
        this.authService.setAuthResponse(response);
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
          if (response.user.type === 'admin') {
            this.naviagtionService.navigateTo('/admin-dashboard');
          } else if (response.user.type === 'medecin') {
            this.naviagtionService.navigateTo('/medecin-dashboard');
          } else if (response.user.type === 'patient') {
            this.naviagtionService.navigateTo('/patient-dashboard');
          } else if (response.user.type === 'infirmier') {
            this.naviagtionService.navigateTo('/infirmier-dashboard');
          } else if (response.user.type === 'laboratin') {
            this.naviagtionService.navigateTo('/laboratin-dashboard');
          } else if (response.user.type === 'radiologue') {
            this.naviagtionService.navigateTo('/dashboard-radiologue');
          } else {
            console.error('Unknown user type:', response.user.type);
          }
          console.log(response);
        }
      },
      error: (error) => {
        this.error = error.error.error || 'Login failed';
      },
    });
  }
}
