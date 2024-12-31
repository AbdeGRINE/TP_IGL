export interface Traitement {
  medicament : string,
  dose : string,
  duree : string,
}

export interface Consultation {
    id : number,
    dateDeCreation: Date,
    ordonnances : Ordonnance[],
    resume : String,
    bilansBiologique: Bilan[],
    bilanRadiologique: Bilan[],
}

export interface DPI {
  id: string;
  nom: string;
  prenom : string,
  NSS : string,
  dateNaissance : Date,
  adresse : string,
  telephone : string,
  mutuelle: string,
  personneAContacter :string,
  medecin: string;
  dateDeCreation: Date;
  consultations : Consultation[]
  soins: Soin[];
  decodeBase64 : string;
}

export interface Ordonnance {
  titre: string;
  state : string,
  traitements: Traitement[];
}
export interface Soin {
  titre: string;
  observation: string;
}

export interface Bilan {
  id: string;
  nom: string;
}