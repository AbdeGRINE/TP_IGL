import { TestBed } from '@angular/core/testing';

import { LaboranService } from './laboran.service';

describe('LaboranService', () => {
  let service: LaboranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
