import { Component,  OnInit} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule,isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup,FormsModule } from '@angular/forms';
import { Bilan } from '../../../models/interfaces/interfaces';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RadiologueService } from '../../../services/radiologue.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

interface Reponse_Bilan { 
  compterendu:{
        nom:string,
        resultat:string,
        bilan:number
    },
    image:{
        donnee:string,
    }
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
  
  newReponse : Reponse_Bilan = {
    compterendu:{
        nom:"lahla la treb7ak",
        resultat:"",
        bilan:-1
    },
    image:{
        donnee:"",
    }
}
  isViewBilanRadioOpen : Boolean;
  Demandes : Bilan [] = [];
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
      this.Demandes = response;
      console.log(this.Demandes);
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
      this.newReponse.image.donnee = reader.result as string;
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

openViewBilanRadio(demande: Bilan){
  this.isViewBilanRadioOpen = true;
  this.selectedBilan = demande;
  this.newReponse ={
    compterendu:{
        nom:"lahla la treb7ak hna tani",
        resultat:"",
        bilan: demande.id,
    },
    image:{
        donnee:"",
    }
}
}

closeViewBilanRadio(){
  this.isViewBilanRadioOpen = false;
}

EnregistrerReponse() {

  if (this.newReponse.compterendu.resultat && this.newReponse.image.donnee) {
    let base64Data = this.newReponse.image.donnee.replace(/^data:image\/[a-z]+;base64,/, '');

    // Remove the trailing '=' characters (padding)
    base64Data = base64Data.replace(/=+$/, '');

    // Assign the cleaned Base64 string back to the object
    this.newReponse.image.donnee = base64Data;
    console.log(this.newReponse);
    // Call postBilanResponse to send data to the backend
    this.radiologueservice.postBilanResponse("bilan/saisir_resultat_bilan_radiologique/", this.newReponse)
      .subscribe(
        response => {
          this.isViewBilanRadioOpen = false;
          alert("Réponse enregistrée avec succès !");
          console.log('Response from server:', response);
          
        },
        error => {
          console.error('Erreur lors de l\'enregistrement:', error);
          alert("Une erreur s'est produite lors de l'enregistrement de la réponse.");
        }
      );

  } else {
    alert("Veuillez remplir tous les champs.");
  }
}


}