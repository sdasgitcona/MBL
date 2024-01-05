import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoTotalPayeblePaymentCurrencyWiseBarComponent } from './cfo-total-payeble-payment-currency-wise-bar.component';

describe('CfoTotalPayeblePaymentCurrencyWiseBarComponent', () => {
  let component: CfoTotalPayeblePaymentCurrencyWiseBarComponent;
  let fixture: ComponentFixture<CfoTotalPayeblePaymentCurrencyWiseBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoTotalPayeblePaymentCurrencyWiseBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoTotalPayeblePaymentCurrencyWiseBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
