import { TestBed } from '@angular/core/testing';

import { TirageService } from './tirage.service';

describe('TirageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TirageService = TestBed.get(TirageService);
    expect(service).toBeTruthy();
  });
});
