import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'; // Import LoginComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],  // Add LoginComponent to imports
  template: `<app-login></app-login>`,  // Use <app-login> here
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: any;
}

