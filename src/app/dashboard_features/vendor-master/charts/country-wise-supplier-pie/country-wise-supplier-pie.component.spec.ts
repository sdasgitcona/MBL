import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWiseSupplierPieComponent } from './country-wise-supplier-pie.component';

describe('CountryWiseSupplierPieComponent', () => {
  let component: CountryWiseSupplierPieComponent;
  let fixture: ComponentFixture<CountryWiseSupplierPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryWiseSupplierPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryWiseSupplierPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
