import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReceivedAndReturnSupplierBarComponent } from './total-received-and-return-supplier-bar.component';

describe('TotalReceivedAndReturnSupplierBarComponent', () => {
  let component: TotalReceivedAndReturnSupplierBarComponent;
  let fixture: ComponentFixture<TotalReceivedAndReturnSupplierBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReceivedAndReturnSupplierBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReceivedAndReturnSupplierBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
