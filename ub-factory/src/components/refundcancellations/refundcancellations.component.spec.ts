import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundcancellationsComponent } from './refundcancellations.component';

describe('RefundcancellationsComponent', () => {
  let component: RefundcancellationsComponent;
  let fixture: ComponentFixture<RefundcancellationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefundcancellationsComponent]
    });
    fixture = TestBed.createComponent(RefundcancellationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
