import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSupplierComponent } from './total-supplier.component';

describe('TotalSupplierComponent', () => {
  let component: TotalSupplierComponent;
  let fixture: ComponentFixture<TotalSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
