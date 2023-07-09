import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdereditemsComponent } from './ordereditems.component';

describe('OrdereditemsComponent', () => {
  let component: OrdereditemsComponent;
  let fixture: ComponentFixture<OrdereditemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdereditemsComponent]
    });
    fixture = TestBed.createComponent(OrdereditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
