import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveInactiveRegistrationBarComponent } from './active-inactive-registration-bar.component';

describe('ActiveInactiveRegistrationBarComponent', () => {
  let component: ActiveInactiveRegistrationBarComponent;
  let fixture: ComponentFixture<ActiveInactiveRegistrationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveInactiveRegistrationBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveInactiveRegistrationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
