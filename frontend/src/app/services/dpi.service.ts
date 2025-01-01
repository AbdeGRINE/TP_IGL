import { Injectable } from '@angular/core';
import { DPI } from '../models/interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class DpiService {
private dpiData: DPI | null = {
  id: 'P12345',
  nom: 'Benziada',
  prenom: 'Fares',
  NSS: '123456',
  dateNaissance: new Date("01-01-2004"),
  adresse: "Reghaia",
  telephone: "0666666666",
  mutuelle: "/",
  personneAContacter: "/",
  medecin: 'Grine',
  dateDeCreation: new Date('2023-01-01'),
  consultations: [{
    id: 1,
    dateDeCreation: new Date('2024-12-30'),
    resume: 'doit etre hospitalise',
    bilanRadiologique: [{
      id: "2",
      nom: "Bilan 2",
    }],
    bilansBiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    ordonnances: [
      {
        titre: 'Ordonnance 1',
        state: 'En attente',
        traitements: [{
          medicament: 'doliprane',
          dose: '2000mg',
          duree: '2 jours',
        }]
      },
    ]
  }
  ],
  soins: [],
  decodeBase64: 'SGVsbG8sIFdvcmxkIQ=='
};
private dpiList: DPI[] | null = [{
  id: 'P12345',
  nom: 'Benziada',
  prenom: 'Fares',
  NSS: '123456',
  dateNaissance: new Date("01-01-2004"),
  adresse: "Reghaia",
  telephone: "0666666666",
  mutuelle: "/",
  personneAContacter: "/",
  medecin: 'Grine',
  dateDeCreation: new Date('2023-01-01'),
  consultations: [{
    id: 1,
    dateDeCreation: new Date('2024-12-30'),
    resume: 'doit etre hospitalise',
    bilanRadiologique: [{
      id: "2",
      nom: "Bilan 2",
    }],
    bilansBiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    ordonnances: [
      {
        titre: 'Ordonnance 1',
        state: 'En attente',
        traitements: [{
          medicament: 'doliprane',
          dose: '2000mg',
          duree: '2 jours',
        }]
      },
    ]
  }
  ],
  soins: [],
  decodeBase64: 'SGVsbG8sIFdvcmxkIQ=='
},
{
  id: 'P12345',
  nom: 'Benziada',
  prenom: 'Fares',
  NSS: '123456',
  dateNaissance: new Date("01-01-2004"),
  adresse: "Reghaia",
  telephone: "0666666666",
  mutuelle: "/",
  personneAContacter: "/",
  medecin: 'Grine',
  dateDeCreation: new Date('2023-01-01'),
  consultations: [{
    id: 1,
    dateDeCreation: new Date('2023-01-01'),
    resume: 'doit etre hospitalise',
    bilanRadiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    bilansBiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    ordonnances: [
      {
        titre: 'Ordonnance 1',
        state: 'En attente',
        traitements: [{
          medicament: 'doliprane',
          dose: '2000mg',
          duree: '2 jours',
        }]
      },
    ]
  }
  ],
  soins: [],
  decodeBase64: ''
},
{
  id: 'P12345',
  nom: 'Benziada',
  prenom: 'Fares',
  NSS: '123456',
  dateNaissance: new Date("01-01-2004"),
  adresse: "Reghaia",
  telephone: "0666666666",
  mutuelle: "/",
  personneAContacter: "/",
  medecin: 'Grine',
  dateDeCreation: new Date('2023-01-01'),
  consultations: [{
    id: 1,
    dateDeCreation: new Date('2023-01-01'),
    resume: 'doit etre hospitalise',
    bilanRadiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    bilansBiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    ordonnances: [
      {
        titre: 'Ordonnance 1',
        state: 'En attente',
        traitements: [{
          medicament: 'doliprane',
          dose: '2000mg',
          duree: '2 jours',
        }]
      },
    ]
  }
  ],
  soins: [],
  decodeBase64: ''
},
{
  id: 'P12345',
  nom: 'Benziada',
  prenom: 'Fares',
  NSS: '123456',
  dateNaissance: new Date("01-01-2004"),
  adresse: "Reghaia",
  telephone: "0666666666",
  mutuelle: "/",
  personneAContacter: "/",
  medecin: 'Grine',
  dateDeCreation: new Date('2023-01-01'),
  consultations: [{
    id: 1,
    dateDeCreation: new Date('2023-01-01'),
    resume: 'doit etre hospitalise',
    bilanRadiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    bilansBiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    ordonnances: [
      {
        titre: 'Ordonnance 1',
        state: 'En attente',
        traitements: [{
          medicament: 'doliprane',
          dose: '2000mg',
          duree: '2 jours',
        }]
      },
    ]
  }
  ],
  soins: [],
  decodeBase64: ''
},
{
  id: 'P12345',
  nom: 'Benziada',
  prenom: 'Fares',
  NSS: '123456',
  dateNaissance: new Date("01-01-2004"),
  adresse: "Reghaia",
  telephone: "0666666666",
  mutuelle: "/",
  personneAContacter: "/",
  medecin: 'Grine',
  dateDeCreation: new Date('2023-01-01'),
  consultations: [{
    id: 1,
    dateDeCreation: new Date('2024-12-30'),
    resume: 'doit etre hospitalise',
    bilanRadiologique: [{
      id: "2",
      nom: "Bilan 2",
    }],
    bilansBiologique: [{
      id: "1",
      nom: "Bilan 1",
    }],
    ordonnances: [
      {
        titre: 'Ordonnance 1',
        state: 'En attente',
        traitements: [{
          medicament: 'doliprane',
          dose: '2000mg',
          duree: '2 jours',
        }]
      },
    ]
  }
  ],
  soins: [],
  decodeBase64: ''
}
];

  constructor() { 
  }

  setDPI(dpi: DPI): void {
    this.dpiData = dpi;
  }

  getDPI(): any {
    return this.dpiData;
  }

  setDPIs(DPIs: DPI[] | null){
    this.dpiList = DPIs;
  }

  getDPIs(){
    return this.dpiList;
  }
}
