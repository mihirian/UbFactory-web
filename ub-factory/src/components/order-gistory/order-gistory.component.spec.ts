import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGistoryComponent } from './order-gistory.component';

describe('OrderGistoryComponent', () => {
  let component: OrderGistoryComponent;
  let fixture: ComponentFixture<OrderGistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderGistoryComponent]
    });
    fixture = TestBed.createComponent(OrderGistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
