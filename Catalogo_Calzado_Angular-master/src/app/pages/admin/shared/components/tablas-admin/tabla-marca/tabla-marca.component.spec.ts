import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMarcaComponent } from './tabla-marca.component';

describe('TablaMarcaComponent', () => {
  let component: TablaMarcaComponent;
  let fixture: ComponentFixture<TablaMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMarcaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
