import { TestBed } from '@angular/core/testing';

import { ConexCategoriaService } from './conex-categoria.service';

describe('ConexCategoriaService', () => {
  let service: ConexCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
