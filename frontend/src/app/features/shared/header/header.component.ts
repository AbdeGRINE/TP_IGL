import { Component } from '@angular/core';
interface User {
  nom: string;
  type: string;
}
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: User = {
    nom: 'Grine Abderrahmane',
    type: 'Medecin',
  };
}
