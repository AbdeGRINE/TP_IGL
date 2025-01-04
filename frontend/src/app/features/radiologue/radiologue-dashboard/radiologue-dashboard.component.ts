import { Component,  OnInit} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup,FormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RadiologueService } from '../../../services/radiologue.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

// {
//   "compterendu":{
//       "nom":"Compte Rendu de l'\''IRM",
//       "resultat":"Le patient présente des signes cliniques d'\''une hernie discale lombaire.",
//       "bilan":3
//   },
//   "image":{
//       "donnee":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAADUlEQVR42mP8z/C/HwAIAQIB8g1qiQAAAABJRU5ErkJggg=="
//   }
// }'

interface Resutat {
  compterendu: {
    nom : string,
    resultat : string,
    bilan : number,
  };
  image :{
    donnee : string,
  }
}

interface Bilan {
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

@Component({
  selector: 'app-radiologue-dashboard',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './radiologue-dashboard.component.html',
  styleUrl: './radiologue-dashboard.component.css'
})
export class RadiologueDashboardComponent implements OnInit{
  imagePreview: string | null = null;
  private isBrowser: boolean;
  selectedBilan : Bilan | null  = null;
  newResultat : Resutat = {
    compterendu: {
      nom : 'hadi response',
      resultat : '',
      bilan : 1,
    },
    image :{
      donnee : '',
    }
  };
  isViewBilanRadioOpen : Boolean;
  BilansEnCours : Bilan[] = [];

constructor(
    private radiologueservice: RadiologueService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private fb: FormBuilder,
    private authService : AuthService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isViewBilanRadioOpen = false;
  }
  ngOnInit(): void {
    this.radiologueservice.getBilansRadiologueEnCours().subscribe(response => {
      this.BilansEnCours = response;
      console.log(`les demandes :  ${this.BilansEnCours}`);
    }, error => {
      console.error('Error fetching bilans:', error);
    });
  }


  // getBilansRadiologueEnCours(): void {
  //   console.log("waaaaaaaaaaa");
  //   this.radiologueservice.getBilansRadiologueEnCours().subscribe({
  //     next: (bilans: Bilan[]) => {
  //       // Map the response to the `Demandes` array structure
  //       this.Demandes = bilans.map(bilan => ({
  //         id: bilan.consultation, // Using `consultation` as the unique ID
  //         nom: bilan.nom,
  //         date_demande : bilan.date_demande,
  //         date_recuperation : bilan.date_recuperation,
  //         status : 'En_cours',
  //         type : bilan.type,
  //         redigant_laborantin : -1, 
  //         redigant_radiologue : -1, 
  //         consultation : bilan.consultation, 
  //         graphique : "Non_Attaché",
  //         medecin: bilan.redigant_radiologue || 'Non spécifié', // Default to 'Non spécifié' if null
  //         date: bilan.date_demande,
  //         compteRendu: '', // Initialize as empty, to be filled later
  //         radioBase64: bilan.graphique === 'Non_Attaché' ? '' : bilan.graphique // Handle 'Non_Attaché' case
  //       }));
  
  //       console.log('Demandes mapped from backend response:', this.Demandes);
  //     },
  //     error: (err) => {
  //       if (err instanceof SyntaxError) {
  //         console.error('Response is not in JSON format:', err);
  //         alert('Le serveur a renvoyé une réponse invalide.');
  //       } else {
  //         console.error('Error fetching bilans:', err);
  //         alert('Erreur lors de la récupération des bilans. Veuillez réessayer.');
  //       }
  //     }
  //   });
  // }
  


onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      this.newResultat.image.donnee = reader.result as string;
      // At this point, this.imagePreview contains the base64 string
      // You can now send this to your backend or store it as needed
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      alert('Error reading file');
    };

    reader.readAsDataURL(file);
  }
}

openViewBilanRadio(index : number){
  this.isViewBilanRadioOpen = true;
  this.selectedBilan = this.BilansEnCours[index];
}

closeViewBilanRadio(){
  this.isViewBilanRadioOpen = false;
}

EnregistrerReponse() {
  if (this.newResultat.compterendu.resultat && this.newResultat.image.donnee) {
    this.radiologueservice.saisirResultatsBilanRadiologique(
      'bilan/saisir_resultat_bilan_radiologique/',
      this.newResultat
    ).subscribe({
      next: (response) => {
        console.log('Result saved successfully', response);
        alert('Résultat enregistré avec succès.');
        this.closeViewBilanRadio();
      },
      error: (err) => {
        console.error('Error saving result:', err);
        alert('Erreur lors de l\'enregistrement du résultat.');
      }
    });
  } else {
    alert('Veuillez remplir tous les champs');
  }
}


}