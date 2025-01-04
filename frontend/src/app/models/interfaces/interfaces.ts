//this is a the general logic of our front-end app:

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  type: Type;
}
export interface Type {
  type: string;
  id: string;
}

export interface DPI {
  id: string;
  nom: string;
  prenom: string;
  NSS: string;
  dateNaissance: Date;
  adresse: string;
  telephone: string;
  mutuelle: string;
  personneAContacter: string;
  medecin: string;
  dateDeCreation: Date;
  consultations: Consultation[];
  soins: Soin[];
  decodeBase64: string;
}
export interface Soin {
  titre: string;
  observation: string;
}

export interface Consultation {
  id: number;
  dateDeCreation: Date;
  ordonnances: Ordonnance[];
  resume: String;
  bilansBiologique: Bilan[];
  bilanRadiologique: Bilan[];
}
export interface Bilan {
  nom: string;
  date_demande: string; // 2005-01-02
  date_recuperation: string | null;
  status: 'En_cours' | 'Terminé';
  type: 'Radiologique' | 'Biologique';
  redigant_laborantin: number | null;
  redigant_radiologue: number | null;
  consultation: number;
  graphique: 'Attaché' | 'Non_Attaché';
}

export interface Ordonnance {
  titre: string;
  state: string;
  traitements: Traitement[];
}
export interface Traitement {
  medicament: string;
  dose: string;
  duree: string;
}
