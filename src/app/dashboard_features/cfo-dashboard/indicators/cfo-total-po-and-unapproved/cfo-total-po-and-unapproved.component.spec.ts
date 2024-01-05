import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoTotalPoAndUnapprovedComponent } from './cfo-total-po-and-unapproved.component';

describe('CfoTotalPoAndUnapprovedComponent', () => {
  let component: CfoTotalPoAndUnapprovedComponent;
  let fixture: ComponentFixture<CfoTotalPoAndUnapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoTotalPoAndUnapprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoTotalPoAndUnapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
