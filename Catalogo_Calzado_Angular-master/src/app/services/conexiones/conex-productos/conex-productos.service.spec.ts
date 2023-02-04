import { TestBed } from '@angular/core/testing';

import { ConexProductosService } from './conex-productos.service';

describe('ConexProductosService', () => {
  let service: ConexProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
