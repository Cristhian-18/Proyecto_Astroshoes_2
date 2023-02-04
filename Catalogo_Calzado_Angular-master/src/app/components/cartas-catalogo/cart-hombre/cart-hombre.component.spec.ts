import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartHombreComponent } from './cart-hombre.component';

describe('CartHombreComponent', () => {
  let component: CartHombreComponent;
  let fixture: ComponentFixture<CartHombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartHombreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartHombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
