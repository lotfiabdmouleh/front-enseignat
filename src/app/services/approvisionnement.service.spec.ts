import {TestBed} from '@angular/core/testing';

import {ApprovisionnementService} from './approvisionnement.service';

describe('ApprovisionnementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovisionnementService = TestBed.get(ApprovisionnementService);
    expect(service).toBeTruthy();
  });
});
