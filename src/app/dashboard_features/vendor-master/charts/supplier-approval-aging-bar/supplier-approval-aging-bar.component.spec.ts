import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierApprovalAgingBarComponent } from './supplier-approval-aging-bar.component';

describe('SupplierApprovalAgingBarComponent', () => {
  let component: SupplierApprovalAgingBarComponent;
  let fixture: ComponentFixture<SupplierApprovalAgingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierApprovalAgingBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierApprovalAgingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
