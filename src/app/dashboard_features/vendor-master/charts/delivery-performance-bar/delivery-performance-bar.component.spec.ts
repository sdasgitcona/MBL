import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPerformanceBarComponent } from './delivery-performance-bar.component';

describe('DeliveryPerformanceBarComponent', () => {
  let component: DeliveryPerformanceBarComponent;
  let fixture: ComponentFixture<DeliveryPerformanceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryPerformanceBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPerformanceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
