import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrOnPriorityComponent } from './pr-on-priority.component';

describe('PrOnPriorityComponent', () => {
  let component: PrOnPriorityComponent;
  let fixture: ComponentFixture<PrOnPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrOnPriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrOnPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
