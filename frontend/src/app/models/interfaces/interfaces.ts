//this is a the general logic of our front-end app:

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  type: Type;
}
export interface Type {
  type: string;
  id: string;
}
export interface UserResponse {
  user: User;
}

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
  consultations: Consultation[];
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

export interface Consultation {
  id: number;
  date: string;
  medecin_consulte: string;
  ordonnances: Ordonnance[];
<<<<<<< HEAD
  resume: String;
  bilansBiologique: Bilan[];
  bilanRadiologique: Bilan[];
}
export interface Bilan {
  id : number,
  nom: string;
  date_demande: string; // 2005-01-02
  date_recuperation: string | null;
  status: 'En_cours' | 'Terminé';
  type: 'Radiologique' | 'Biologique';
  redigant_laborantin: number | null;
  redigant_radiologue: number | null;
  consultation: number;
  graphique: 'Attaché' | 'Non_Attaché';
=======
  bilans: Bilan[];
  dpi: number;
  resumes: Resume[];
>>>>>>> 8fa550c627fd161a5edc174d9c87fa877acd98f8
}

export interface Ordonnance {
  id: number;
  status: string;
  date: string;
  observation: string;
  consultation: number;
  medicaments: Traitement[];
}

export interface Bilan {
  nom: string;
  date_demande: string;
  date_recuperation: string;
  status: string;
  type: string;
  redigant_laborantin: string;
  redigant_radiologue: string;
  consultation: number;
  graphique: string;
}

export interface Resume {
  id: number;
  date_prochaine_consultation: string;
  mesures_prises: string;
  autres: string;
  consultation: number;
}

export interface Traitement {
  medicament: string;
  duree: string;
  dosage: string;
}


// export interface DPI {
//   id: string;
//   nom: string;
//   prenom: string;
//   NSS: string;
//   dateNaissance: Date;
//   adresse: string;
//   telephone: string;
//   mutuelle: string;
//   personneAContacter: string;
//   medecin: string;
//   dateDeCreation: Date;
//   consultations: Consultation[];
//   soins: Soin[];
//   decodeBase64: string;
// }
// export interface Soin {
//   titre: string;
//   observation: string;
// }

// export interface Consultation {
//   id: number;
//   dateDeCreation: Date;
//   ordonnances: Ordonnance[];
//   resume: String;
//   bilansBiologique: Bilan[];
//   bilanRadiologique: Bilan[];
// }

// export interface Bilan {
//   nom: string;
//   date_demande: string; // 2005-01-02
//   date_recuperation: string | null;
//   status: 'En_cours' | 'Terminé';
//   type: 'Radiologique' | 'Biologique';
//   redigant_laborantin: number | null;
//   redigant_radiologue: number | null;
//   consultation: number;
//   graphique: 'Attaché' | 'Non_Attaché';
// }

// export interface Ordonnance {
//   titre: string;
//   state: string;
//   traitements: Traitement[];
// }

// export interface Traitement {
//   medicament: string;
//   dose: string;
//   duree: string;
// }