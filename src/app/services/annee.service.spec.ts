import { TestBed } from '@angular/core/testing';

import { AnneeService } from './annee.service';

describe('AnneeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnneeService = TestBed.get(AnneeService);
    expect(service).toBeTruthy();
  });
});
