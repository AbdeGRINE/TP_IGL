import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DPI {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  dateDeCreation: Date;
}
interface User{
  nom: string,
  type: string,
}
@Component({
  selector: 'app-medecin-dashboard',
  imports: [CommonModule],
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.css',
})
export class MedecinDashboardComponent {
  user: User ={
    nom: "Grine Abderrahmane",
    type: "Medecin",
  }
  DPIs: DPI[] = [
    {
      id: 'P12345',
      nom: 'John Doe',
      email: 'john.doe@example.com',
      telephone: '+1234567890',
      dateDeCreation: new Date('2023-01-01'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
    {
      id: 'P67890',
      nom: 'Jane Smith',
      email: 'jane.smith@example.com',
      telephone: '+0987654321',
      dateDeCreation: new Date('2023-02-15'),
    },
  ];
}
