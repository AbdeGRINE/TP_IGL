import { Component,  } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,FormsModule } from '@angular/forms';
import { Bilan } from '../../../models/interfaces/interfaces';


interface DemandeBilan {
  id: number,
  nom : string,
  medecin : string,
  date : string,
  compteRendu : string;
  radioBase64 : string;
}

@Component({
  selector: 'app-radiologue-dashboard',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './radiologue-dashboard.component.html',
  styleUrl: './radiologue-dashboard.component.css'
})
export class RadiologueDashboardComponent {
  imagePreview: string | null = null;
  selectedBilan : DemandeBilan | null  = null;
  newResponse : DemandeBilan = {
    id: -1,
    nom : "",
    medecin : "",
    date : "",
    compteRendu : "",
    radioBase64 : "",
  }
  isViewBilanRadioOpen : Boolean;
  Demandes : DemandeBilan[] = [{
    id: 1,
    nom: 'test',
    medecin: 'test',
    date: 'test',
    compteRendu: '',
    radioBase64: ''
  },
  {
    id: 1,
    nom: 'test',
    medecin: 'test',
    date: 'test',
    compteRendu: '',
    radioBase64: ''
  },
  {
    id: 1,
    nom: 'test',
    medecin: 'test',
    date: 'test',
    compteRendu: '',
    radioBase64: ''
  },
]

constructor(private fb: FormBuilder){
  this.isViewBilanRadioOpen = false;
}

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
      this.newResponse.radioBase64 = reader.result as string;
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

openViewBilanRadio(demande: DemandeBilan){
  this.isViewBilanRadioOpen = true;
  this.selectedBilan = demande;
  this.newResponse = this.selectedBilan;
}

closeViewBilanRadio(){
  this.isViewBilanRadioOpen = false;
}

EnregistrerReponse(){
  if(this.newResponse.compteRendu && this.newResponse.radioBase64){
    if(this.selectedBilan){
    this.selectedBilan.compteRendu = this.newResponse.compteRendu;
    this.selectedBilan.radioBase64 = this.newResponse.radioBase64;
    console.log(this.selectedBilan);
    }
  }
  else{
    alert("Veuillez remplir tout les champs")
  }
}
}