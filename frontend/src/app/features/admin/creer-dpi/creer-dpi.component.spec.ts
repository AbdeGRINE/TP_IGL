import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDPIComponent } from './creer-dpi.component';

describe('CreerDPIComponent', () => {
  let component: CreerDPIComponent;
  let fixture: ComponentFixture<CreerDPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerDPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerDPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
