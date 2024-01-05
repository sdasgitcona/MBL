import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingInvoicesComponent } from './incoming-invoices.component';

describe('IncomingInvoicesComponent', () => {
  let component: IncomingInvoicesComponent;
  let fixture: ComponentFixture<IncomingInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
