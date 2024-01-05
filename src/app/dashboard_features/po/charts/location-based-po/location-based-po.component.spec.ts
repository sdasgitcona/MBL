import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBasedPOComponent } from './location-based-po.component';

describe('LocationBasedPOComponent', () => {
  let component: LocationBasedPOComponent;
  let fixture: ComponentFixture<LocationBasedPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationBasedPOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationBasedPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
