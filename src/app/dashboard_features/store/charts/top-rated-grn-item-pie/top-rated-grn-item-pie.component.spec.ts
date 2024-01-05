import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedGrnItemPieComponent } from './top-rated-grn-item-pie.component';

describe('TopRatedGrnItemPieComponent', () => {
  let component: TopRatedGrnItemPieComponent;
  let fixture: ComponentFixture<TopRatedGrnItemPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRatedGrnItemPieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedGrnItemPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
