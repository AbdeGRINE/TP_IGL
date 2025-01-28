import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  DPI,
  Traitement,
  Ordonnance,
  Consultation,
  Bilan,
} from '../../../models/interfaces/interfaces';
import { DpiService } from '../../../services/dpi.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../../../services/api-data.service';
import { AuthResponse } from '../../../models/interfaces/interfaces';
import { AuthService } from '../../../services/auth.service';

interface BilanRequest {
  nom: string;
  type: string;
  consultation: string;
}

@Component({
  selector: 'app-creer-consultation',
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './creer-consultation.component.html',
  styleUrl: './creer-consultation.component.css',
})
export class CreerConsultationComponent implements OnInit {
  selectedPatient: DPI;
  indexOfOrdonnanceToDelete: number = -1;
  OrdonnanceToDelete: Ordonnance | null = null;
  newTraitement: Traitement = {
    medicament: '',
    dosage: '',
    duree: '',
  };
  newTraitements: Traitement[] = [];
  newOrdonnace: Ordonnance = {
    id: 0,
    status: '',
    date: '',
    observation: '',
    consultation: 0,
    medicaments: [],
  };
  newConsultation: Consultation = {
    id: 0,
    date: '',
    medecin_consulte: '',
    ordonnances: [],
    bilans: [],
    dpi: 0,
    resumes: [
      {
        id: 0,
        date_prochaine_consultation: '',
        mesures_prises: '',
        autres: '',
        consultation: 0,
      },
    ],
    resume: '',
    bilansBiologique: [],
    bilanRadiologique: []
  };
  selectedOrdonnance: Ordonnance | null = null;
  selectedBilansBiologique: BilanRequest[] = [];
  selectedBilansRadiologique: BilanRequest[] = [];
  authResponse: AuthResponse;

  constructor(
    private dpiService: DpiService,
    private router: Router,
    private route: ActivatedRoute,
    private apiDataService: ApiDataService,
    private authService: AuthService
  ) {
    this.selectedPatient = this.dpiService.getDPI();
    this.newConsultation.ordonnances = [];
    this.selectedOrdonnance = null;
    // console.log(this.selectedPatient);
    this.authResponse = this.authService.getAuthResponse();
  }
  ngOnInit(): void {
    this.selectedOrdonnance = null;
    // console.log(this.selectedPatient);
  }

  //------------------------------------------- Ordonnance Logic:
  isAddOrdonnanceOpen = false;
  isViewOrdonnanceOpen = false;
  wantsToDelete = false;
  isPopupOpen = false;

  openAddOrdonnance() {
    this.selectedOrdonnance = this.newOrdonnace;
    this.isAddOrdonnanceOpen = true;
    this.isPopupOpen = true;
  }

  closeAddOrdonnance() {
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }

  AnnulerOrdonnance() {
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }

  openViewOrdonnance(ordonnance: Ordonnance) {
    this.selectedOrdonnance = ordonnance;
    this.isViewOrdonnanceOpen = true;
    this.isPopupOpen = true;
    console.log(this.selectedOrdonnance);
  }

  closeViewOrdonnance() {
    this.isViewOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }
  //------------------------------------------- Bilans Logic:
  bilansBiologique: BilanRequest[] = [
    {
      nom: 'Test sanguin',
      type: 'Biologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: "Analyse d'urine",
      type: 'Biologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: 'Test de la fonction hépatique',
      type: 'Biologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: 'Test de la fonction rénale',
      type: 'Biologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: 'Numération formule sanguine',
      type: 'Biologique',
      consultation: `${this.newConsultation.id}`,
    },
  ];

  bilansRadio: BilanRequest[] = [
    {
      nom: 'Radiographie thoracique',

      type: 'Radiologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: 'IRM cérébrale',
      type: 'Radiologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: 'Scanner abdominal',
      type: 'Radiologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: 'Mammographie',
      type: 'Radiologique',
      consultation: `${this.newConsultation.id}`,
    },
    {
      nom: 'Échographie pelvienne',
      type: 'Radiologique',
      consultation: `${this.newConsultation.id}`,
    },
  ];

  onCheckboxChangeBio(bilan: BilanRequest, event: any) {
    if (event.target.checked) {
      console.log(bilan);
      this.selectedBilansBiologique = [...this.selectedBilansBiologique, bilan];
    } else {
      this.selectedBilansBiologique = this.selectedBilansBiologique.filter(
        (elt) => elt !== bilan
      );
    }
    console.log(this.selectedBilansBiologique);
  }

  onCheckboxChangeRadio(bilan: BilanRequest, event: any) {
    if (event.target.checked) {
      console.log(bilan);
      this.selectedBilansRadiologique = [
        ...this.selectedBilansRadiologique,
        bilan,
      ];
    } else {
      this.selectedBilansRadiologique = this.selectedBilansRadiologique.filter(
        (elt) => elt !== bilan
      );
    }
    console.log(this.selectedBilansRadiologique);
  }
  //------------------------------------------- Sumbition Section:

  addNewTrait() {
    if (
      this.selectedOrdonnance &&
      this.newTraitement.medicament &&
      this.newTraitement.dosage &&
      this.newTraitement.duree
    ) {
      this.newTraitements.push({ ...this.newTraitement });
      this.newTraitement = { medicament: '', dosage: '', duree: '' }; // Reset input fields
    } else {
      alert("Veuillez remplir tous les champs avant d'ajouter un traitement.");
    }
  }
  EnregistrerOrdonnace() {
    this.newOrdonnace.medicaments = this.newTraitements;
    this.newOrdonnace.consultation =
      this.selectedPatient.consultations[
        this.selectedPatient.consultations.length - 1
      ].id; //weird but it work, who cares?
    if (this.newOrdonnace?.medicaments) {
      //creat the ordonnace:
      this.apiDataService
        .createOrdonnace<Ordonnance>(
          `Ordonnance/creer/`,
          this.newOrdonnace,
          `${this.authService.getToken()}`
        )
        .subscribe({
          next: (response) => {
            alert('L"ordonnance du patient a été enregistrées avec succès!');
            //update before push:
            this.newOrdonnace.id = response.id;
            this.newOrdonnace.date = response.date;
            console.log('HHH: ', this.newOrdonnace.medicaments);
            this.newConsultation.ordonnances.push({ ...this.newOrdonnace });
            // reset:
            this.newOrdonnace = {
              id: 0,
              status: '',
              date: '',
              observation: '',
              consultation: 0,
              medicaments: [],
            };
            this.newTraitements = [];
          },
          error: (err) => {
            alert(
              'Impossible d"enregistrer l"ordonnance. Veuillez réessayer.\nNota Bene: il faut ecrire le ID de medicament deja existe!'
            );
            console.error(err);
          },
        });
    }
    
    this.isAddOrdonnanceOpen = false;
    this.isPopupOpen = false;
  }

  onSubmit() {
    console.log(this.newConsultation.ordonnances);
    if (
      this.newConsultation.ordonnances &&
      this.newConsultation.resumes[0].mesures_prises
    ) {
      //Sumbit Resume:
      this.newConsultation.resumes[0].consultation =
        this.selectedPatient.consultations[
          this.selectedPatient.consultations.length - 1
        ].id; //weird but it work, who cares?
      this.apiDataService
        .createResume(
          `Consultation/resume/`,
          this.newConsultation.resumes[0],
          `${this.authService.getToken()}`
        )
        .subscribe({
          next: (response) => {},
          error: (err) => {
            alert('Impossible d"enregistrer le resume. Veuillez réessayer.');
            console.error(err);
          },
        });

      //Sumbit Bilans:
      //1-Biologique:
      this.apiDataService
        .post<Bilan>(
          `demander_bilan/`,
          this.selectedBilansBiologique,
          `${this.authService.getToken()}`
        )
        .subscribe({
          next: (response) => {
            //NO NEED FOR THIS PUSHING!
            // this.newConsultation.bilans.push(...{response});
          },
          error: (err) => {
            alert(
              'Impossible d"envoyer les bilans biologique. Veuillez réessayer.'
            );
            console.error(err);
          },
        });
      //2- Radiologique:
      this.apiDataService
        .post<Bilan>(
          `demander_bilan/`,
          this.selectedBilansRadiologique,
          `${this.authService.getToken()}`
        )
        .subscribe({
          next: (response) => {
            // this.newConsultation.bilans.push(...{response});
          },
          error: (err) => {
            alert(
              'Impossible d"envoyer les bilans radiologique. Veuillez réessayer.'
            );
            console.error(err);
          },
        });
      alert('La nouvelle Consultation a etait creer avec succes!');
      this.goBack();
    } else {
      alert(
        "Veuillez remplir le resume et les ordonnaces avant d'ajouter une consultation."
      );
    }
    // NO NEED FOR THIS TOO:
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  //------------------------------------------- Delete Section:

  deleteOrdonnance() {
    console.log(this.newConsultation);
    this.newConsultation.ordonnances = this.newConsultation?.ordonnances.filter(
      (c) => c.id !== this.OrdonnanceToDelete?.id
    );
    this.indexOfOrdonnanceToDelete = -1;
    this.wantsToDelete = false;
    this.isPopupOpen = false;
  }

  OpenDeletionPopup(index: number) {
    this.wantsToDelete = true;
    this.isPopupOpen = true;
    console.log(index);
    this.indexOfOrdonnanceToDelete = index;
    this.OrdonnanceToDelete =
      this.newConsultation.ordonnances[this.indexOfOrdonnanceToDelete];
    console.log(this.OrdonnanceToDelete);
  }

  closeDeletionPopup() {
    console.log(this.newConsultation);
    this.indexOfOrdonnanceToDelete = -1;
    this.isPopupOpen = false;
    this.wantsToDelete = false;
  }
}
