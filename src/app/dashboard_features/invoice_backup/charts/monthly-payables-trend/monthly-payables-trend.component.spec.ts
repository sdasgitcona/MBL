import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPayablesTrendComponent } from './monthly-payables-trend.component';

describe('MonthlyPayablesTrendComponent', () => {
  let component: MonthlyPayablesTrendComponent;
  let fixture: ComponentFixture<MonthlyPayablesTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyPayablesTrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyPayablesTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
