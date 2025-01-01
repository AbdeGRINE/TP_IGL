import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratinDashboardComponent } from './laboratin-dashboard.component';

describe('LaboratinDashboardComponent', () => {
  let component: LaboratinDashboardComponent;
  let fixture: ComponentFixture<LaboratinDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratinDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratinDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
