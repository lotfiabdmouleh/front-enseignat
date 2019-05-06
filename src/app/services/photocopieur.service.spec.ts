import { TestBed } from '@angular/core/testing';

import { PhotocopieurService } from './photocopieur.service';

describe('PhotocopieurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotocopieurService = TestBed.get(PhotocopieurService);
    expect(service).toBeTruthy();
  });
});
