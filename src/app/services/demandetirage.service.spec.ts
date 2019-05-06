import { TestBed } from '@angular/core/testing';

import { DemandetirageService } from './demandetirage.service';

describe('DemandetirageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandetirageService = TestBed.get(DemandetirageService);
    expect(service).toBeTruthy();
  });
});
