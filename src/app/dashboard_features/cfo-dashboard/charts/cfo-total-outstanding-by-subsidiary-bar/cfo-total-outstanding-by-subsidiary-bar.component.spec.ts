import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoTotalOutstandingBySubsidiaryBarComponent } from './cfo-total-outstanding-by-subsidiary-bar.component';

describe('CfoTotalOutstandingBySubsidiaryBarComponent', () => {
  let component: CfoTotalOutstandingBySubsidiaryBarComponent;
  let fixture: ComponentFixture<CfoTotalOutstandingBySubsidiaryBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoTotalOutstandingBySubsidiaryBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoTotalOutstandingBySubsidiaryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
