import {TestBed} from '@angular/core/testing';

import {AncreService} from './ancre.service';

describe('AncreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AncreService = TestBed.get(AncreService);
    expect(service).toBeTruthy();
  });
});
