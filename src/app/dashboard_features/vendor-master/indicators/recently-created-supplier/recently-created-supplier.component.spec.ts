import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedSupplierComponent } from './recently-created-supplier.component';

describe('RecentlyCreatedSupplierComponent', () => {
  let component: RecentlyCreatedSupplierComponent;
  let fixture: ComponentFixture<RecentlyCreatedSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
