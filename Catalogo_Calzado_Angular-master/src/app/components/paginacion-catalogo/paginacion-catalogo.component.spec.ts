import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionCatalogoComponent } from './paginacion-catalogo.component';

describe('PaginacionCatalogoComponent', () => {
  let component: PaginacionCatalogoComponent;
  let fixture: ComponentFixture<PaginacionCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginacionCatalogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginacionCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
