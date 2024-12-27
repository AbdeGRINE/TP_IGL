import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Add this import
import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit(): void {
    if (this.email && this.password) {
      console.log('Login successful!');
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    } else {
      console.log('Please fill in both fields!');
    }
  }
}
