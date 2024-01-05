import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenandApprovedPRComponent } from './openand-approved-pr.component';

describe('OpenandApprovedPRComponent', () => {
  let component: OpenandApprovedPRComponent;
  let fixture: ComponentFixture<OpenandApprovedPRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenandApprovedPRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenandApprovedPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
