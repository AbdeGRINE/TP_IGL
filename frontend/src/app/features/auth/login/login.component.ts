import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  private isBrowser: boolean;

  constructor(
    private naviagtionService: NavigationService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onSubmit(): void {
    this.authService.login("test_medecin", "test_medecin").subscribe({
      next: (response) => {
        if (this.isBrowser) {
          //Save the user's settings:
          localStorage.setItem('authResponse', JSON.stringify(response));
          console.log(response);
          if (response.user.type.type  === 'admin') {
            this.naviagtionService.navigateTo('/admin-dashboard');
          } else if (response.user.type.type  === 'medcin') {
            this.naviagtionService.navigateTo('/medecin-dashboard');
          } else if (response.user.type.type  === 'patient') {
            this.naviagtionService.navigateTo('/patient-dashboard');
          } else if (response.user.type.type  === 'infermier') {
            this.naviagtionService.navigateTo('/infirmier-dashboard');
          } else if (response.user.type.type  === 'laboratin') {
            this.naviagtionService.navigateTo('/laboratin-dashboard');
          } else if (response.user.type.type  === 'radiologue') {
            this.naviagtionService.navigateTo('/dashboard-radiologue');
          } else {
            console.error('Unknown user type:', response.user.type.type );
          }
        }
      },
      error: (error) => {
        this.error = error.error.error || 'Login failed';
      },
    });
  }
}
