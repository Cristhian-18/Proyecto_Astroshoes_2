import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasNovedadesComponent } from './ultimas-novedades.component';

describe('UltimasNovedadesComponent', () => {
  let component: UltimasNovedadesComponent;
  let fixture: ComponentFixture<UltimasNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimasNovedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimasNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
