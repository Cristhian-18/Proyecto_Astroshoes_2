import { TestBed } from '@angular/core/testing';

import { ConexUsuariosService } from './conex-usuarios.service';

describe('ConexUsuariosService', () => {
  let service: ConexUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
