import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDetailsPieComponent } from './shipment-details-pie.component';

describe('ShipmentDetailsPieComponent', () => {
  let component: ShipmentDetailsPieComponent;
  let fixture: ComponentFixture<ShipmentDetailsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentDetailsPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentDetailsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
