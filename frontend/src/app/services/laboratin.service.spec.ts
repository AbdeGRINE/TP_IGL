import { TestBed } from '@angular/core/testing';

import { LaboratinService } from './laboratin.service';

describe('LaboratinService', () => {
  let service: LaboratinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
