import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseHoldingValuePieComponent } from './item-wise-holding-value-pie.component';

describe('ItemWiseHoldingValuePieComponent', () => {
  let component: ItemWiseHoldingValuePieComponent;
  let fixture: ComponentFixture<ItemWiseHoldingValuePieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemWiseHoldingValuePieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemWiseHoldingValuePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
