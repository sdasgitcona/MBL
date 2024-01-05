import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoInvoiceAgingForSubsidiaryidsBarComponent } from './cfo-invoice-aging-for-subsidiaryids-bar.component';

describe('CfoInvoiceAgingForSubsidiaryidsBarComponent', () => {
  let component: CfoInvoiceAgingForSubsidiaryidsBarComponent;
  let fixture: ComponentFixture<CfoInvoiceAgingForSubsidiaryidsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoInvoiceAgingForSubsidiaryidsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoInvoiceAgingForSubsidiaryidsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
