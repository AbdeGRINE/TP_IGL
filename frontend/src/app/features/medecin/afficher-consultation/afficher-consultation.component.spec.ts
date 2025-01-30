import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherConsultationComponent } from './afficher-consultation.component';

describe('AfficherConsultationComponent', () => {
  let component: AfficherConsultationComponent;
  let fixture: ComponentFixture<AfficherConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
