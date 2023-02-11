import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOfertasComponent } from './cart-ofertas.component';

describe('CartOfertasComponent', () => {
  let component: CartOfertasComponent;
  let fixture: ComponentFixture<CartOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOfertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
