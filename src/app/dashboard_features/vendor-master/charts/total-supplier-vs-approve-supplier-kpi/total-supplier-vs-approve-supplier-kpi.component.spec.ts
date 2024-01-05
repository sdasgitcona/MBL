import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSupplierVsApproveSupplierKpiComponent } from './total-supplier-vs-approve-supplier-kpi.component';

describe('TotalSupplierVsApproveSupplierKpiComponent', () => {
  let component: TotalSupplierVsApproveSupplierKpiComponent;
  let fixture: ComponentFixture<TotalSupplierVsApproveSupplierKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSupplierVsApproveSupplierKpiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSupplierVsApproveSupplierKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
