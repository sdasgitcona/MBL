import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedBillsComponent } from './recently-created-bills.component';

describe('RecentlyCreatedBillsComponent', () => {
  let component: RecentlyCreatedBillsComponent;
  let fixture: ComponentFixture<RecentlyCreatedBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
