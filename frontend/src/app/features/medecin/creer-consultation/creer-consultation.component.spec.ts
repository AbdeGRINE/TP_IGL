import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerConsultationComponent } from './creer-consultation.component';

describe('CreerConsultationComponent', () => {
  let component: CreerConsultationComponent;
  let fixture: ComponentFixture<CreerConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
