export interface Traitement {
  medicament : string,
  dose : string,
  duree : string,
}

export interface Consultation {
    dateDeCreation: Date,
    ordonnances : Ordonnance[],
    resume : String,
    bilansBiologique: Bilan[],
    bilanRadiologique: Bilan[],
}

export interface DPI {
  id: string;
  //info patient
  nom: string;
  medecin: string;
  dateDeCreation: Date;
  consultations : Consultation[]
  soins: Soin[];
  //graphe?
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