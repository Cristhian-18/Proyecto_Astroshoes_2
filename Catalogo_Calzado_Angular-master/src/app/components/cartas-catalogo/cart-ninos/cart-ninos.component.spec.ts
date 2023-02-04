import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNinosComponent } from './cart-ninos.component';

describe('CartNinosComponent', () => {
  let component: CartNinosComponent;
  let fixture: ComponentFixture<CartNinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartNinosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartNinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
