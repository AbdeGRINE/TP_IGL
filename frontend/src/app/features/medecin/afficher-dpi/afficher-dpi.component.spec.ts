import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDpiComponent } from './afficher-dpi.component';

describe('AfficherDpiComponent', () => {
  let component: AfficherDpiComponent;
  let fixture: ComponentFixture<AfficherDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficherDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
