import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBillsOpenBillsComponent } from './total-bills-open-bills.component';

describe('TotalBillsOpenBillsComponent', () => {
  let component: TotalBillsOpenBillsComponent;
  let fixture: ComponentFixture<TotalBillsOpenBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalBillsOpenBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalBillsOpenBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
