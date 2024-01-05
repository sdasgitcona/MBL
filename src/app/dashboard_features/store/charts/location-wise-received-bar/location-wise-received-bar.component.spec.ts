import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWiseReceivedBarComponent } from './location-wise-received-bar.component';

describe('LocationWiseReceivedBarComponent', () => {
  let component: LocationWiseReceivedBarComponent;
  let fixture: ComponentFixture<LocationWiseReceivedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationWiseReceivedBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationWiseReceivedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
