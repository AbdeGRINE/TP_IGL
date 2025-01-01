import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
          console.log(response);
        }
        //we will use the the navigation.service to routing.
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.error = error.error.error || 'Login failed';
      }
    });
  }
}