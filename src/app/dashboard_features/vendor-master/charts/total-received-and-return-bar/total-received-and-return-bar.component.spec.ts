import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReceivedAndReturnBarComponent } from './total-received-and-return-bar.component';

describe('TotalReceivedAndReturnBarComponent', () => {
  let component: TotalReceivedAndReturnBarComponent;
  let fixture: ComponentFixture<TotalReceivedAndReturnBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReceivedAndReturnBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReceivedAndReturnBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
