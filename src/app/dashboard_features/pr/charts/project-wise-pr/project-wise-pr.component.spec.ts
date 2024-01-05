import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWisePRComponent } from './project-wise-pr.component';

describe('ProjectWisePRComponent', () => {
  let component: ProjectWisePRComponent;
  let fixture: ComponentFixture<ProjectWisePRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWisePRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWisePRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
