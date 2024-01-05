import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoTotalPayebleAmountCurrencyWiseBarComponent } from './cfo-total-payeble-amount-currency-wise-bar.component';

describe('CfoTotalPayebleAmountCurrencyWiseBarComponent', () => {
  let component: CfoTotalPayebleAmountCurrencyWiseBarComponent;
  let fixture: ComponentFixture<CfoTotalPayebleAmountCurrencyWiseBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoTotalPayebleAmountCurrencyWiseBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoTotalPayebleAmountCurrencyWiseBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
