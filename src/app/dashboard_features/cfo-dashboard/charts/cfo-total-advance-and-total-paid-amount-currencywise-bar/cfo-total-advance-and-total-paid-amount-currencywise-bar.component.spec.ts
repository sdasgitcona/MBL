import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoTotalAdvanceAndTotalPaidAmountCurrencywiseBarComponent } from './cfo-total-advance-and-total-paid-amount-currencywise-bar.component';

describe('CfoTotalAdvanceAndTotalPaidAmountCurrencywiseBarComponent', () => {
  let component: CfoTotalAdvanceAndTotalPaidAmountCurrencywiseBarComponent;
  let fixture: ComponentFixture<CfoTotalAdvanceAndTotalPaidAmountCurrencywiseBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoTotalAdvanceAndTotalPaidAmountCurrencywiseBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoTotalAdvanceAndTotalPaidAmountCurrencywiseBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
