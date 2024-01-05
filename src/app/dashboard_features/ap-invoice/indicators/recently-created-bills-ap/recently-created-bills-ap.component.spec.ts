import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedBillsApComponent } from './recently-created-bills-ap.component';

describe('RecentlyCreatedBillsApComponent', () => {
  let component: RecentlyCreatedBillsApComponent;
  let fixture: ComponentFixture<RecentlyCreatedBillsApComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedBillsApComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedBillsApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
