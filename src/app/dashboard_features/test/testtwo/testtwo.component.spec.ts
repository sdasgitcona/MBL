import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttwoComponent } from './testtwo.component';

describe('TesttwoComponent', () => {
  let component: TesttwoComponent;
  let fixture: ComponentFixture<TesttwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesttwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesttwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
