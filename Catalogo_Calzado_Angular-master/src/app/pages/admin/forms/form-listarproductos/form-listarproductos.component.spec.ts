import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListarproductosComponent } from './form-listarproductos.component';

describe('FormListarproductosComponent', () => {
  let component: FormListarproductosComponent;
  let fixture: ComponentFixture<FormListarproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListarproductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListarproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
