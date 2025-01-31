import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAfficherConsultationComponent } from './patient-afficher-consultation.component';

describe('PatientAfficherConsultationComponent', () => {
  let component: PatientAfficherConsultationComponent;
  let fixture: ComponentFixture<PatientAfficherConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAfficherConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAfficherConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
