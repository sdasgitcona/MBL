import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalActiveVsDeactivatedProductPieComponent } from './total-active-vs-deactivated-product-pie.component';

describe('TotalActiveVsDeactivatedProductPieComponent', () => {
  let component: TotalActiveVsDeactivatedProductPieComponent;
  let fixture: ComponentFixture<TotalActiveVsDeactivatedProductPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalActiveVsDeactivatedProductPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalActiveVsDeactivatedProductPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
