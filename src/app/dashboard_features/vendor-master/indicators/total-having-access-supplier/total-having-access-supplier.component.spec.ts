import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalHavingAccessSupplierComponent } from './total-having-access-supplier.component';

describe('TotalHavingAccessSupplierComponent', () => {
  let component: TotalHavingAccessSupplierComponent;
  let fixture: ComponentFixture<TotalHavingAccessSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalHavingAccessSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalHavingAccessSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
