import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoMonthlyPaymentTrendBarComponent } from './cfo-monthly-payment-trend-bar.component';

describe('CfoMonthlyPaymentTrendBarComponent', () => {
  let component: CfoMonthlyPaymentTrendBarComponent;
  let fixture: ComponentFixture<CfoMonthlyPaymentTrendBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoMonthlyPaymentTrendBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoMonthlyPaymentTrendBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
