import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoTotalInvoiceAndUnapprovedComponent } from './cfo-total-invoice-and-unapproved.component';

describe('CfoTotalInvoiceAndUnapprovedComponent', () => {
  let component: CfoTotalInvoiceAndUnapprovedComponent;
  let fixture: ComponentFixture<CfoTotalInvoiceAndUnapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoTotalInvoiceAndUnapprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoTotalInvoiceAndUnapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
