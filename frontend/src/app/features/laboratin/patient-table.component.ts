import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { HeaderComponent } from '../../features/shared/header/header.component';


@Component({
  selector: 'app-patient-table',
  standalone: true,  
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css'],
  imports: [CommonModule], 
})
export class PatientTableComponent {
  DPIs = [
    
    {
      nom: 'Jane Smith',
      id: '67890',
      email: 'jane.smith@example.com',
      telephone: '555-5678',
      dateDeCreation: new Date(),
    },
    {
      nom: 'Jane Smith',
      id: '67890',
      email: 'jane.smith@example.com',
      telephone: '555-5678',
      dateDeCreation: new Date(),
    },
    {
      nom: 'Jane Smith',
      id: '67890',
      email: 'jane.smith@example.com',
      telephone: '555-5678',
      dateDeCreation: new Date(),
    },
    {
      nom: 'Jane Smith',
      id: '67890',
      email: 'jane.smith@example.com',
      telephone: '555-5678',
      dateDeCreation: new Date(),
    },
    {
      nom: 'Jane Smith',
      id: '67890',
      email: 'jane.smith@example.com',
      telephone: '555-5678',
      dateDeCreation: new Date(),
    },
    {
      nom: 'Jane Smith',
      id: '67890',
      email: 'jane.smith@example.com',
      telephone: '555-5678',
      dateDeCreation: new Date(),
    },
    {
      nom: 'Jane Smith',
      id: '67890',
      email: 'jane.smith@example.com',
      telephone: '555-5678',
      dateDeCreation: new Date(),
    },
  ];
}
