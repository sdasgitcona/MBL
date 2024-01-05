import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoApprovedBuildKPIComponent } from './po-approved-build-kpi.component';

describe('PoApprovedBuildKPIComponent', () => {
  let component: PoApprovedBuildKPIComponent;
  let fixture: ComponentFixture<PoApprovedBuildKPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoApprovedBuildKPIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoApprovedBuildKPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
