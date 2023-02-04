import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoModalsComponent } from './info-modals.component';

describe('InfoModalsComponent', () => {
  let component: InfoModalsComponent;
  let fixture: ComponentFixture<InfoModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoModalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
