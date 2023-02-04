import { TestBed } from '@angular/core/testing';

import { ConexMarcaService } from './conex-marca.service';

describe('ConexMarcaService', () => {
  let service: ConexMarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexMarcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
