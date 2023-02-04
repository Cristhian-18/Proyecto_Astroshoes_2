import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccMarcasComponent } from './secc-marcas.component';

describe('SeccMarcasComponent', () => {
  let component: SeccMarcasComponent;
  let fixture: ComponentFixture<SeccMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccMarcasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
