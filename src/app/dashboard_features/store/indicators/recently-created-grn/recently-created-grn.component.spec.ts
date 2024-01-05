import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedGrnComponent } from './recently-created-grn.component';

describe('RecentlyCreatedGrnComponent', () => {
  let component: RecentlyCreatedGrnComponent;
  let fixture: ComponentFixture<RecentlyCreatedGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedGrnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
