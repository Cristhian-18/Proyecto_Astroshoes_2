import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMujeresComponent } from './cart-mujeres.component';

describe('CartMujeresComponent', () => {
  let component: CartMujeresComponent;
  let fixture: ComponentFixture<CartMujeresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartMujeresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartMujeresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
