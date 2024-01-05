import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOpenApComponent } from './total-open-ap.component';

describe('TotalOpenApComponent', () => {
  let component: TotalOpenApComponent;
  let fixture: ComponentFixture<TotalOpenApComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalOpenApComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalOpenApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
