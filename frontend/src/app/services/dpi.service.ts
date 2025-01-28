import { Injectable } from '@angular/core';
// import { DPI } from '../models/interfaces/interfaces'
export interface DPI {
  id: string;
  patient_nom: string;
  patient_prenom: string;
  medecin_traitant: MedecinTraitant;
  etablissement_courant: EtablissementCourant;
  date_creation: string;
  telephone: string;
  nss: string;
  qr_code: string;
}

export interface MedecinTraitant {
  id: number;
  nom: string;
  prenom: string;
  specialite: string;
}

export interface EtablissementCourant {
  id: number;
  nom: string;
  adresse: string;
}

@Injectable({
  providedIn: 'root',
})
export class DpiService {
<<<<<<< HEAD
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
      nom: "IRM",
      date_demande: "2024-12-31",
      date_recuperation: null,
      status: "En_cours",
      type: "Radiologique",
      redigant_laborantin: null,
      redigant_radiologue: null,
      consultation: 1,
      graphique: "Non_Attaché",
      id: 0
    }],
    bilansBiologique: [{
      nom: "IRM",
      date_demande: "2024-12-31",
      date_recuperation: null,
      status: "En_cours",
      type: "Radiologique",
      redigant_laborantin: null,
      redigant_radiologue: null,
      consultation: 1,
      graphique: "Non_Attaché",
      id: 0
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
private dpiList: DPI[] | null =null;
//= [{
//   id: 'P12345',
//   nom: 'Benziada',
//   prenom: 'Fares',
//   NSS: '123456',
//   dateNaissance: new Date("01-01-2004"),
//   adresse: "Reghaia",
//   telephone: "0666666666",
//   mutuelle: "/",
//   personneAContacter: "/",
//   medecin: 'Grine',
//   dateDeCreation: new Date('2023-01-01'),
//   consultations: [{
//     id: 1,
//     dateDeCreation: new Date('2024-12-30'),
//     resume: 'doit etre hospitalise',
//     bilanRadiologique: {
//       nom: "IRM",
//       date_demande: "2024-12-31",
//       date_recuperation: null,
//       status: "En_cours",
//       type: "Radiologique",
//       redigant_laborantin: null,
//       redigant_radiologue: null,
//       consultation: 1,
//       graphique: "Non_Attaché"
//       }],
//     bilansBiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     ordonnances: [
//       {
//         titre: 'Ordonnance 1',
//         state: 'En attente',
//         traitements: [{
//           medicament: 'doliprane',
//           dose: '2000mg',
//           duree: '2 jours',
//         }]
//       },
//     ]
//   }
//   ],
//   soins: [],
//   decodeBase64: 'SGVsbG8sIFdvcmxkIQ=='
// },
// {
//   id: 'P12345',
//   nom: 'Benziada',
//   prenom: 'Fares',
//   NSS: '123456',
//   dateNaissance: new Date("01-01-2004"),
//   adresse: "Reghaia",
//   telephone: "0666666666",
//   mutuelle: "/",
//   personneAContacter: "/",
//   medecin: 'Grine',
//   dateDeCreation: new Date('2023-01-01'),
//   consultations: [{
//     id: 1,
//     dateDeCreation: new Date('2023-01-01'),
//     resume: 'doit etre hospitalise',
//     bilanRadiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     bilansBiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     ordonnances: [
//       {
//         titre: 'Ordonnance 1',
//         state: 'En attente',
//         traitements: [{
//           medicament: 'doliprane',
//           dose: '2000mg',
//           duree: '2 jours',
//         }]
//       },
//     ]
//   }
//   ],
//   soins: [],
//   decodeBase64: ''
// },
// {
//   id: 'P12345',
//   nom: 'Benziada',
//   prenom: 'Fares',
//   NSS: '123456',
//   dateNaissance: new Date("01-01-2004"),
//   adresse: "Reghaia",
//   telephone: "0666666666",
//   mutuelle: "/",
//   personneAContacter: "/",
//   medecin: 'Grine',
//   dateDeCreation: new Date('2023-01-01'),
//   consultations: [{
//     id: 1,
//     dateDeCreation: new Date('2023-01-01'),
//     resume: 'doit etre hospitalise',
//     bilanRadiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     bilansBiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     ordonnances: [
//       {
//         titre: 'Ordonnance 1',
//         state: 'En attente',
//         traitements: [{
//           medicament: 'doliprane',
//           dose: '2000mg',
//           duree: '2 jours',
//         }]
//       },
//     ]
//   }
//   ],
//   soins: [],
//   decodeBase64: ''
// },
// {
//   id: 'P12345',
//   nom: 'Benziada',
//   prenom: 'Fares',
//   NSS: '123456',
//   dateNaissance: new Date("01-01-2004"),
//   adresse: "Reghaia",
//   telephone: "0666666666",
//   mutuelle: "/",
//   personneAContacter: "/",
//   medecin: 'Grine',
//   dateDeCreation: new Date('2023-01-01'),
//   consultations: [{
//     id: 1,
//     dateDeCreation: new Date('2023-01-01'),
//     resume: 'doit etre hospitalise',
//     bilanRadiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     bilansBiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     ordonnances: [
//       {
//         titre: 'Ordonnance 1',
//         state: 'En attente',
//         traitements: [{
//           medicament: 'doliprane',
//           dose: '2000mg',
//           duree: '2 jours',
//         }]
//       },
//     ]
//   }
//   ],
//   soins: [],
//   decodeBase64: ''
// },
// {
//   id: 'P12345',
//   nom: 'Benziada',
//   prenom: 'Fares',
//   NSS: '123456',
//   dateNaissance: new Date("01-01-2004"),
//   adresse: "Reghaia",
//   telephone: "0666666666",
//   mutuelle: "/",
//   personneAContacter: "/",
//   medecin: 'Grine',
//   dateDeCreation: new Date('2023-01-01'),
//   consultations: [{
//     id: 1,
//     dateDeCreation: new Date('2024-12-30'),
//     resume: 'doit etre hospitalise',
//     bilanRadiologique: [{
//       id: "2",
//       nom: "Bilan 2",
//     }],
//     bilansBiologique: [{
//       id: "1",
//       nom: "Bilan 1",
//     }],
//     ordonnances: [
//       {
//         titre: 'Ordonnance 1',
//         state: 'En attente',
//         traitements: [{
//           medicament: 'doliprane',
//           dose: '2000mg',
//           duree: '2 jours',
//         }]
//       },
//     ]
//   }
//   ],
//   soins: [],
//   decodeBase64: ''
// }
// ];
=======
  private dpiData: DPI | null = {
    id: '',
    patient_nom: '',
    patient_prenom: '',
    medecin_traitant: {
      id: 0,
      nom: '',
      prenom: '',
      specialite: '',
    },
    etablissement_courant: {
      id: 0,
      nom: '',
      adresse: '',
    },
    date_creation: '',
    nss: '',
    qr_code: '',
    telephone: '',
  };
  private dpiList: DPI[] | null = null;
  //= [{
  //   id: 'P12345',
  //   nom: 'Benziada',
  //   prenom: 'Fares',
  //   NSS: '123456',
  //   dateNaissance: new Date("01-01-2004"),
  //   adresse: "Reghaia",
  //   telephone: "0666666666",
  //   mutuelle: "/",
  //   personneAContacter: "/",
  //   medecin: 'Grine',
  //   dateDeCreation: new Date('2023-01-01'),
  //   consultations: [{
  //     id: 1,
  //     dateDeCreation: new Date('2024-12-30'),
  //     resume: 'doit etre hospitalise',
  //     bilanRadiologique: {
  //       nom: "IRM",
  //       date_demande: "2024-12-31",
  //       date_recuperation: null,
  //       status: "En_cours",
  //       type: "Radiologique",
  //       redigant_laborantin: null,
  //       redigant_radiologue: null,
  //       consultation: 1,
  //       graphique: "Non_Attaché"
  //       }],
  //     bilansBiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     ordonnances: [
  //       {
  //         titre: 'Ordonnance 1',
  //         state: 'En attente',
  //         traitements: [{
  //           medicament: 'doliprane',
  //           dose: '2000mg',
  //           duree: '2 jours',
  //         }]
  //       },
  //     ]
  //   }
  //   ],
  //   soins: [],
  //   decodeBase64: 'SGVsbG8sIFdvcmxkIQ=='
  // },
  // {
  //   id: 'P12345',
  //   nom: 'Benziada',
  //   prenom: 'Fares',
  //   NSS: '123456',
  //   dateNaissance: new Date("01-01-2004"),
  //   adresse: "Reghaia",
  //   telephone: "0666666666",
  //   mutuelle: "/",
  //   personneAContacter: "/",
  //   medecin: 'Grine',
  //   dateDeCreation: new Date('2023-01-01'),
  //   consultations: [{
  //     id: 1,
  //     dateDeCreation: new Date('2023-01-01'),
  //     resume: 'doit etre hospitalise',
  //     bilanRadiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     bilansBiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     ordonnances: [
  //       {
  //         titre: 'Ordonnance 1',
  //         state: 'En attente',
  //         traitements: [{
  //           medicament: 'doliprane',
  //           dose: '2000mg',
  //           duree: '2 jours',
  //         }]
  //       },
  //     ]
  //   }
  //   ],
  //   soins: [],
  //   decodeBase64: ''
  // },
  // {
  //   id: 'P12345',
  //   nom: 'Benziada',
  //   prenom: 'Fares',
  //   NSS: '123456',
  //   dateNaissance: new Date("01-01-2004"),
  //   adresse: "Reghaia",
  //   telephone: "0666666666",
  //   mutuelle: "/",
  //   personneAContacter: "/",
  //   medecin: 'Grine',
  //   dateDeCreation: new Date('2023-01-01'),
  //   consultations: [{
  //     id: 1,
  //     dateDeCreation: new Date('2023-01-01'),
  //     resume: 'doit etre hospitalise',
  //     bilanRadiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     bilansBiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     ordonnances: [
  //       {
  //         titre: 'Ordonnance 1',
  //         state: 'En attente',
  //         traitements: [{
  //           medicament: 'doliprane',
  //           dose: '2000mg',
  //           duree: '2 jours',
  //         }]
  //       },
  //     ]
  //   }
  //   ],
  //   soins: [],
  //   decodeBase64: ''
  // },
  // {
  //   id: 'P12345',
  //   nom: 'Benziada',
  //   prenom: 'Fares',
  //   NSS: '123456',
  //   dateNaissance: new Date("01-01-2004"),
  //   adresse: "Reghaia",
  //   telephone: "0666666666",
  //   mutuelle: "/",
  //   personneAContacter: "/",
  //   medecin: 'Grine',
  //   dateDeCreation: new Date('2023-01-01'),
  //   consultations: [{
  //     id: 1,
  //     dateDeCreation: new Date('2023-01-01'),
  //     resume: 'doit etre hospitalise',
  //     bilanRadiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     bilansBiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     ordonnances: [
  //       {
  //         titre: 'Ordonnance 1',
  //         state: 'En attente',
  //         traitements: [{
  //           medicament: 'doliprane',
  //           dose: '2000mg',
  //           duree: '2 jours',
  //         }]
  //       },
  //     ]
  //   }
  //   ],
  //   soins: [],
  //   decodeBase64: ''
  // },
  // {
  //   id: 'P12345',
  //   nom: 'Benziada',
  //   prenom: 'Fares',
  //   NSS: '123456',
  //   dateNaissance: new Date("01-01-2004"),
  //   adresse: "Reghaia",
  //   telephone: "0666666666",
  //   mutuelle: "/",
  //   personneAContacter: "/",
  //   medecin: 'Grine',
  //   dateDeCreation: new Date('2023-01-01'),
  //   consultations: [{
  //     id: 1,
  //     dateDeCreation: new Date('2024-12-30'),
  //     resume: 'doit etre hospitalise',
  //     bilanRadiologique: [{
  //       id: "2",
  //       nom: "Bilan 2",
  //     }],
  //     bilansBiologique: [{
  //       id: "1",
  //       nom: "Bilan 1",
  //     }],
  //     ordonnances: [
  //       {
  //         titre: 'Ordonnance 1',
  //         state: 'En attente',
  //         traitements: [{
  //           medicament: 'doliprane',
  //           dose: '2000mg',
  //           duree: '2 jours',
  //         }]
  //       },
  //     ]
  //   }
  //   ],
  //   soins: [],
  //   decodeBase64: ''
  // }
  // ];
>>>>>>> 8fa550c627fd161a5edc174d9c87fa877acd98f8

  constructor() {}

  setDPI(dpi: DPI): void {
    this.dpiData = dpi;
  }

  getDPI(): any {
    return this.dpiData;
  }

  setDPIs(DPIs: DPI[] | null) {
    this.dpiList = DPIs;
  }

  getDPIs() {
    return this.dpiList;
  }
}
