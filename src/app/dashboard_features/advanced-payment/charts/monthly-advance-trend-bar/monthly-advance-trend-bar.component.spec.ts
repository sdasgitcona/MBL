import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAdvanceTrendBarComponent } from './monthly-advance-trend-bar.component';

describe('MonthlyAdvanceTrendBarComponent', () => {
  let component: MonthlyAdvanceTrendBarComponent;
  let fixture: ComponentFixture<MonthlyAdvanceTrendBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyAdvanceTrendBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyAdvanceTrendBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
