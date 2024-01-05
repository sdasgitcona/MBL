import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalApprovedVsTotalPaidBillsKpiComponent } from './total-approved-vs-total-paid-bills-kpi.component';

describe('TotalApprovedVsTotalPaidBillsKpiComponent', () => {
  let component: TotalApprovedVsTotalPaidBillsKpiComponent;
  let fixture: ComponentFixture<TotalApprovedVsTotalPaidBillsKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalApprovedVsTotalPaidBillsKpiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalApprovedVsTotalPaidBillsKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
