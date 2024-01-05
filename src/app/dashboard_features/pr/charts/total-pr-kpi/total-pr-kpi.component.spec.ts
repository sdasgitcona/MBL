import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPrKPIComponent } from './total-pr-kpi.component';

describe('TotalPrKPIComponent', () => {
  let component: TotalPrKPIComponent;
  let fixture: ComponentFixture<TotalPrKPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalPrKPIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPrKPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
