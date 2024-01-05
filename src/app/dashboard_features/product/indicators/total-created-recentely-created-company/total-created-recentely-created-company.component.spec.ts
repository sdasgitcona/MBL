import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCreatedRecentelyCreatedCompanyComponent } from './total-created-recentely-created-company.component';

describe('TotalCreatedRecentelyCreatedCompanyComponent', () => {
  let component: TotalCreatedRecentelyCreatedCompanyComponent;
  let fixture: ComponentFixture<TotalCreatedRecentelyCreatedCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCreatedRecentelyCreatedCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalCreatedRecentelyCreatedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
