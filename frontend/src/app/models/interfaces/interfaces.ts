//this is a the general logic of our front-end app:

export interface AuthResponse {
  id_role: string; //the id of patient, not user_patient!
  token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  type: string;
}
export interface UserResponse {
  user: User;
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
  id: string;
  nom: string;
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
