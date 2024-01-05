import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReceivedTotalReturnGrnComponent } from './total-received-total-return-grn.component';

describe('TotalReceivedTotalReturnGrnComponent', () => {
  let component: TotalReceivedTotalReturnGrnComponent;
  let fixture: ComponentFixture<TotalReceivedTotalReturnGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReceivedTotalReturnGrnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReceivedTotalReturnGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
