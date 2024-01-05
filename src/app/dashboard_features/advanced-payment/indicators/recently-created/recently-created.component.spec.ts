import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyCreatedComponent } from './recently-created.component';

describe('RecentlyCreatedComponent', () => {
  let component: RecentlyCreatedComponent;
  let fixture: ComponentFixture<RecentlyCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyCreatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
