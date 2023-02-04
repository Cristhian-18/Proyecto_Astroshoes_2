import { TestBed } from '@angular/core/testing';

import { ConexFavService } from './conex-fav.service';

describe('ConexFavService', () => {
  let service: ConexFavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexFavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
