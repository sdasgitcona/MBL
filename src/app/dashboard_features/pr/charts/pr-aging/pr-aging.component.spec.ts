import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrAgingComponent } from './pr-aging.component';

describe('PrAgingComponent', () => {
  let component: PrAgingComponent;
  let fixture: ComponentFixture<PrAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
