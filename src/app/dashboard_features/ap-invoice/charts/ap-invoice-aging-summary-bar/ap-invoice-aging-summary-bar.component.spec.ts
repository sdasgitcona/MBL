import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApInvoiceAgingSummaryBarComponent } from './ap-invoice-aging-summary-bar.component';

describe('ApInvoiceAgingSummaryBarComponent', () => {
  let component: ApInvoiceAgingSummaryBarComponent;
  let fixture: ComponentFixture<ApInvoiceAgingSummaryBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApInvoiceAgingSummaryBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApInvoiceAgingSummaryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
