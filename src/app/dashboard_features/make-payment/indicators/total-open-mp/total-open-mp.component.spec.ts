import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOpenMpComponent } from './total-open-mp.component';

describe('TotalOpenMpComponent', () => {
  let component: TotalOpenMpComponent;
  let fixture: ComponentFixture<TotalOpenMpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalOpenMpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalOpenMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
