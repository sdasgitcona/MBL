import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoApprovalAgingComponent } from './po-approval-aging.component';

describe('PoApprovalAgingComponent', () => {
  let component: PoApprovalAgingComponent;
  let fixture: ComponentFixture<PoApprovalAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoApprovalAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoApprovalAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
