import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentApprovalAgingComponent } from './payment-approval-aging.component';

describe('PaymentApprovalAgingComponent', () => {
  let component: PaymentApprovalAgingComponent;
  let fixture: ComponentFixture<PaymentApprovalAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentApprovalAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentApprovalAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
