import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPoComponent } from './open-po.component';

describe('OpenPoComponent', () => {
  let component: OpenPoComponent;
  let fixture: ComponentFixture<OpenPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
