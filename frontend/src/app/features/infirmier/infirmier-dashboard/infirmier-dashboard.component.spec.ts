import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfirmierDashboardComponent } from './infirmier-dashboard.component';

describe('InfirmierDashboardComponent', () => {
  let component: InfirmierDashboardComponent;
  let fixture: ComponentFixture<InfirmierDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfirmierDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfirmierDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
