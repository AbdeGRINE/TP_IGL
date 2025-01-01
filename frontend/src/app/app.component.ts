import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
=======
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
>>>>>>> d84b03e495db39b4438c513639d8a8c53c00ff05
})
export class AppComponent {
}
