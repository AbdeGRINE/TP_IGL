import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { creerConsultationGuard } from './creer-consultation.guard';

describe('creerConsultationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => creerConsultationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
