import { Injectable } from '@angular/core';
import { Consultation } from '../models/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
private consultationData: Consultation | null = null;

  constructor() { }

  setConsultation(consultation: Consultation): void {
    this.consultationData = consultation;
  }

  getConsultation(): any {
    return this.consultationData;
  }
}
