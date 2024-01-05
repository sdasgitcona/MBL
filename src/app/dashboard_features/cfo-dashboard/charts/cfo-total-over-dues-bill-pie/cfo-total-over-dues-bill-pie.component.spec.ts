import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoTotalOverDuesBillPieComponent } from './cfo-total-over-dues-bill-pie.component';

describe('CfoTotalOverDuesBillPieComponent', () => {
  let component: CfoTotalOverDuesBillPieComponent;
  let fixture: ComponentFixture<CfoTotalOverDuesBillPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoTotalOverDuesBillPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoTotalOverDuesBillPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
