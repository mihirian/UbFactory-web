import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingpolicyComponent } from './shippingpolicy.component';

describe('ShippingpolicyComponent', () => {
  let component: ShippingpolicyComponent;
  let fixture: ComponentFixture<ShippingpolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingpolicyComponent]
    });
    fixture = TestBed.createComponent(ShippingpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
