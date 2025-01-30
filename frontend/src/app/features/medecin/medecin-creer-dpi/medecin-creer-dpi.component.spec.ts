import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinCreerDpiComponent } from './medecin-creer-dpi.component';

describe('MedecinCreerDpiComponent', () => {
  let component: MedecinCreerDpiComponent;
  let fixture: ComponentFixture<MedecinCreerDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinCreerDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinCreerDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
