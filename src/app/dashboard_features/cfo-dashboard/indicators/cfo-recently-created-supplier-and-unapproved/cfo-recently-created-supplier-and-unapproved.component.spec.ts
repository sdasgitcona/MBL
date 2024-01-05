import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfoRecentlyCreatedSupplierAndUnapprovedComponent } from './cfo-recently-created-supplier-and-unapproved.component';

describe('CfoRecentlyCreatedSupplierAndUnapprovedComponent', () => {
  let component: CfoRecentlyCreatedSupplierAndUnapprovedComponent;
  let fixture: ComponentFixture<CfoRecentlyCreatedSupplierAndUnapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfoRecentlyCreatedSupplierAndUnapprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfoRecentlyCreatedSupplierAndUnapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
