import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedPOComponent } from './recently-created-po.component';

describe('RecentlyCreatedPOComponent', () => {
  let component: RecentlyCreatedPOComponent;
  let fixture: ComponentFixture<RecentlyCreatedPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedPOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
