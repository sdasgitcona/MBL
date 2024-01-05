import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageUpdateDetailsBarComponent } from './package-update-details-bar.component';

describe('PackageUpdateDetailsBarComponent', () => {
  let component: PackageUpdateDetailsBarComponent;
  let fixture: ComponentFixture<PackageUpdateDetailsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageUpdateDetailsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageUpdateDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
