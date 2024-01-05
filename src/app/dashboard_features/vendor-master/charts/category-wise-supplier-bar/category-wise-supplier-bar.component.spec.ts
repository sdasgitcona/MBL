import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseSupplierBarComponent } from './category-wise-supplier-bar.component';

describe('CategoryWiseSupplierBarComponent', () => {
  let component: CategoryWiseSupplierBarComponent;
  let fixture: ComponentFixture<CategoryWiseSupplierBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryWiseSupplierBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWiseSupplierBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
