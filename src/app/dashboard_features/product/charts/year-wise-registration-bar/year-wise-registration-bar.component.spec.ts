import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearWiseRegistrationBarComponent } from './year-wise-registration-bar.component';

describe('YearWiseRegistrationBarComponent', () => {
  let component: YearWiseRegistrationBarComponent;
  let fixture: ComponentFixture<YearWiseRegistrationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearWiseRegistrationBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearWiseRegistrationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
