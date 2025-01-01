import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { afficherConsultationGuard } from './afficher-consultation.guard';

describe('afficherConsultationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => afficherConsultationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
