import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInicioComponent } from './form-inicio.component';

describe('FormInicioComponent', () => {
  let component: FormInicioComponent;
  let fixture: ComponentFixture<FormInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
