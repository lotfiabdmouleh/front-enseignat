import { TestBed } from '@angular/core/testing';

import { AgenttirageService } from './agenttirage.service';

describe('AgenttirageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgenttirageService = TestBed.get(AgenttirageService);
    expect(service).toBeTruthy();
  });
});
