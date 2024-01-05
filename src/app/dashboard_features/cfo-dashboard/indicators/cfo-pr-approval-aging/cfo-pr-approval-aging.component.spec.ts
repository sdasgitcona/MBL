import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoPrApprovalAgingComponent } from './cfo-pr-approval-aging.component';

describe('CfoPrApprovalAgingComponent', () => {
  let component: CfoPrApprovalAgingComponent;
  let fixture: ComponentFixture<CfoPrApprovalAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoPrApprovalAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoPrApprovalAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
