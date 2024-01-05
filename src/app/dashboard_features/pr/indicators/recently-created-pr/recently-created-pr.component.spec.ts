import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedPrComponent } from './recently-created-pr.component';

describe('RecentlyCreatedPrComponent', () => {
  let component: RecentlyCreatedPrComponent;
  let fixture: ComponentFixture<RecentlyCreatedPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedPrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
