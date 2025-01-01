import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { afficherDpiGuard } from './afficher-dpi.guard';

describe('afficherDpiGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => afficherDpiGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
