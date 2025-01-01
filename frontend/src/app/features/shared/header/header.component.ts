import { Component } from '@angular/core';
//this user will be deleted, and be imported from the public model.
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
    type: 'Type', //this is a static declaration for test.
  };
}
