import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVsApprovedPaymentComponent } from './total-vs-approved-payment.component';

describe('TotalVsApprovedPaymentComponent', () => {
  let component: TotalVsApprovedPaymentComponent;
  let fixture: ComponentFixture<TotalVsApprovedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalVsApprovedPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVsApprovedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
