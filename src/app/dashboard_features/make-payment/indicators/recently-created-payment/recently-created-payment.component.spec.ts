import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedPaymentComponent } from './recently-created-payment.component';

describe('RecentlyCreatedPaymentComponent', () => {
  let component: RecentlyCreatedPaymentComponent;
  let fixture: ComponentFixture<RecentlyCreatedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
