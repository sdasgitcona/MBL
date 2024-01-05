import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnVsBillKpiComponent } from './grn-vs-bill-kpi.component';

describe('GrnVsBillKpiComponent', () => {
  let component: GrnVsBillKpiComponent;
  let fixture: ComponentFixture<GrnVsBillKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnVsBillKpiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnVsBillKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
