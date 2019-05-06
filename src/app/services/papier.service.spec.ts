import { TestBed } from '@angular/core/testing';

import { PapierService } from './papier.service';

describe('PapierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PapierService = TestBed.get(PapierService);
    expect(service).toBeTruthy();
  });
});
