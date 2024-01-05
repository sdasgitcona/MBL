import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUnregisteredSupplierComponent } from './registered-unregistered-supplier.component';

describe('RegisteredUnregisteredSupplierComponent', () => {
  let component: RegisteredUnregisteredSupplierComponent;
  let fixture: ComponentFixture<RegisteredUnregisteredSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUnregisteredSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredUnregisteredSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
