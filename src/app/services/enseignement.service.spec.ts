import {TestBed} from '@angular/core/testing';

import {EnseignementService} from './enseignement.service';

describe('EnseignementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnseignementService = TestBed.get(EnseignementService);
    expect(service).toBeTruthy();
  });
});
