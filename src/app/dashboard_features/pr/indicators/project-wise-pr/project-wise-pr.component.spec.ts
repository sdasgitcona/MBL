import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWisePrComponent } from './project-wise-pr.component';

describe('ProjectWisePrComponent', () => {
  let component: ProjectWisePrComponent;
  let fixture: ComponentFixture<ProjectWisePrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWisePrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWisePrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
